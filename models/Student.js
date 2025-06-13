const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  classroom: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      required: true
    },
    notes: String
  }],
  subjects: [{
    name: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  grades: [{
    subject: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['quiz', 'homework', 'exam', 'project', 'midterm', 'final'],
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  financialInfo: {
    totalFees: {
      type: Number,
      default: 0
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    remainingAmount: {
      type: Number,
      default: 0
    },
    paymentHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    }]
  }
});

module.exports = mongoose.model('Student', StudentSchema);