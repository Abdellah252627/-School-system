const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true,
    default: 100
  },
  type: {
    type: String,
    enum: ['quiz', 'homework', 'exam', 'project', 'midterm', 'final'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Grade', GradeSchema);