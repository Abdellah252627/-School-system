const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Expense = require('../models/Expense');
const FeeStructure = require('../models/FeeStructure');
const Student = require('../models/Student');

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

// الحصول على هيكل الرسوم
router.get('/fee-structure', async (req, res) => {
  try {
    const feeStructure = await FeeStructure.find({ isActive: true });
    res.json(feeStructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إضافة هيكل رسوم جديد (المدير فقط)
router.post('/fee-structure', isAdminOrTeacher, async (req, res) => {
  try {
    const feeStructure = new FeeStructure({
      ...req.body,
      schoolYear: req.body.schoolYear || '2024-2025'
    });
    await feeStructure.save();
    res.json(feeStructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جميع المدفوعات
router.get('/payments', isAdminOrTeacher, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('student', 'user grade classroom')
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تسجيل دفعة جديدة
router.post('/payments', isAdminOrTeacher, async (req, res) => {
  try {
    const { studentId, amount, feeType, paymentMethod, notes } = req.body;
    
    // إنشاء رقم إيصال
    const receiptNumber = 'REC-' + Date.now();
    
    const payment = new Payment({
      student: studentId,
      amount,
      feeType,
      paymentMethod,
      receiptNumber,
      notes,
      createdBy: req.session.user.id
    });
    
    await payment.save();
    
    // تحديث المعلومات المالية للطالب
    const student = await Student.findById(studentId);
    if (student) {
      student.financialInfo.paidAmount += amount;
      student.financialInfo.remainingAmount = student.financialInfo.totalFees - student.financialInfo.paidAmount;
      student.financialInfo.paymentHistory.push(payment._id);
      await student.save();
    }
    
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على مدفوعات طالب معين
router.get('/payments/student/:studentId', async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.params.studentId })
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جميع المصروفات
router.get('/expenses', isAdminOrTeacher, async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('createdBy', 'name')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تسجيل مصروف جديد
router.post('/expenses', isAdminOrTeacher, async (req, res) => {
  try {
    const receiptNumber = 'EXP-' + Date.now();
    
    const expense = new Expense({
      ...req.body,
      receiptNumber,
      createdBy: req.session.user.id,
      approvedBy: req.session.user.id
    });
    
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تقرير مالي
router.get('/reports/financial', isAdminOrTeacher, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }
    
    const totalPayments = await Payment.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalExpenses = await Expense.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const paymentsByType = await Payment.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$feeType', total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    
    const expensesByCategory = await Expense.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalIncome: totalPayments[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      netIncome: (totalPayments[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      paymentsByType,
      expensesByCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// حساب الرسوم للطالب
router.post('/calculate-fees', isAdminOrTeacher, async (req, res) => {
  try {
    const { grade } = req.body;
    
    const fees = await FeeStructure.find({ 
      $or: [{ grade }, { grade: 'all' }],
      isActive: true 
    });
    
    let totalFees = 0;
    fees.forEach(fee => {
      if (fee.frequency === 'annual') {
        totalFees += fee.amount;
      } else if (fee.frequency === 'semester') {
        totalFees += fee.amount * 2;
      } else if (fee.frequency === 'monthly') {
        totalFees += fee.amount * 10; // 10 أشهر دراسية
      }
    });
    
    res.json({ totalFees, fees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;