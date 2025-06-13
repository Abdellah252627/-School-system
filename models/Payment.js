const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  feeType: {
    type: String,
    enum: ['tuition', 'books', 'transport', 'activities', 'full_payment'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'credit_card', 'check'],
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'completed'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);