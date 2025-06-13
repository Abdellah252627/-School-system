const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  publishYear: {
    type: Number
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true
  },
  location: {
    type: String // رقم الرف أو الموقع في المكتبة
  },
  description: {
    type: String
  },
  coverImage: {
    type: String // رابط صورة الغلاف
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const BorrowingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  },
  notes: {
    type: String
  },
  fine: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', BookSchema);
const Borrowing = mongoose.model('Borrowing', BorrowingSchema);

module.exports = { Book, Borrowing };