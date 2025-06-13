const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number
  }],
  instructions: {
    type: String
  },
  maxScore: {
    type: Number,
    default: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    files: [{
      filename: String,
      originalName: String,
      path: String,
      size: Number
    }],
    notes: String,
    score: Number,
    feedback: String,
    status: {
      type: String,
      enum: ['submitted', 'graded', 'late'],
      default: 'submitted'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Homework', HomeworkSchema);