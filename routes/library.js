const express = require('express');
const router = express.Router();
const { Book, Borrowing } = require('../models/Library');

// Middleware للتحقق من الصلاحيات
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

const isAdminOrTeacher = (req, res, next) => {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'teacher')) {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isAuthenticated);

// الحصول على جميع الكتب
router.get('/books', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = { isActive: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    const books = await Book.find(query).sort({ title: 1 });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إضافة كتاب جديد (المدير والمعلم)
router.post('/books', isAdminOrTeacher, async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      availableCopies: req.body.totalCopies
    });
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تحديث كتاب
router.put('/books/:id', isAdminOrTeacher, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// حذف كتاب
router.delete('/books/:id', isAdminOrTeacher, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    book.isActive = false;
    await book.save();
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// استعارة كتاب
router.post('/borrow', async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }
    
    // التحقق من عدم وجود استعارة سابقة غير مرجعة
    const existingBorrowing = await Borrowing.findOne({
      book: bookId,
      borrower: req.session.user.id,
      status: 'borrowed'
    });
    
    if (existingBorrowing) {
      return res.status(400).json({ message: 'You already have this book borrowed' });
    }
    
    const borrowing = new Borrowing({
      book: bookId,
      borrower: req.session.user.id,
      dueDate: new Date(dueDate)
    });
    
    await borrowing.save();
    
    // تقليل عدد النسخ المتاحة
    book.availableCopies -= 1;
    await book.save();
    
    res.json(borrowing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إرجاع كتاب
router.post('/return/:borrowingId', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.borrowingId)
      .populate('book');
    
    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }
    
    if (borrowing.borrower.toString() !== req.session.user.id && 
        req.session.user.role !== 'admin' && 
        req.session.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    borrowing.returnDate = new Date();
    borrowing.status = 'returned';
    
    // حساب الغرامة إذا كان متأخراً
    if (new Date() > borrowing.dueDate) {
      const daysLate = Math.ceil((new Date() - borrowing.dueDate) / (1000 * 60 * 60 * 24));
      borrowing.fine = daysLate * 5; // 5 ريال لكل يوم تأخير
    }
    
    await borrowing.save();
    
    // زيادة عدد النسخ المتاحة
    const book = await Book.findById(borrowing.book._id);
    book.availableCopies += 1;
    await book.save();
    
    res.json(borrowing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على استعارات المستخدم
router.get('/my-borrowings', async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ borrower: req.session.user.id })
      .populate('book', 'title author isbn')
      .sort({ borrowDate: -1 });
    
    res.json(borrowings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جميع الاستعارات (للمدير والمعلم)
router.get('/borrowings', isAdminOrTeacher, async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    const borrowings = await Borrowing.find(query)
      .populate('book', 'title author isbn')
      .populate('borrower', 'name email')
      .sort({ borrowDate: -1 });
    
    res.json(borrowings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تقرير المكتبة
router.get('/reports', isAdminOrTeacher, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ isActive: true });
    const totalBorrowings = await Borrowing.countDocuments();
    const activeBorrowings = await Borrowing.countDocuments({ status: 'borrowed' });
    const overdueBorrowings = await Borrowing.countDocuments({ 
      status: 'borrowed',
      dueDate: { $lt: new Date() }
    });
    
    const popularBooks = await Borrowing.aggregate([
      { $group: { _id: '$book', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'book' } },
      { $unwind: '$book' }
    ]);
    
    res.json({
      totalBooks,
      totalBorrowings,
      activeBorrowings,
      overdueBorrowings,
      popularBooks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على الفئات
router.get('/categories', async (req, res) => {
  try {
    const categories = await Book.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;