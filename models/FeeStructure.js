const mongoose = require('mongoose');

const FeeStructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true // يمكن أن يكون 'all' للجميع أو رقم الصف
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['tuition', 'books', 'transport', 'activities', 'other'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['annual', 'semester', 'monthly'],
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  schoolYear: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FeeStructure', FeeStructureSchema);