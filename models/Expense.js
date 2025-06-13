const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['salaries', 'utilities', 'supplies', 'maintenance', 'transport', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'credit_card', 'check'],
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'paid'
  },
  receiptNumber: {
    type: String,
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);