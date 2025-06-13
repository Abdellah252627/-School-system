const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  classroom: {
    type: String,
    required: true
  },
  schoolYear: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      required: true
    },
    periods: [{
      periodNumber: {
        type: Number,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      room: {
        type: String
      }
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const ExamScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['midterm', 'final', 'quiz', 'monthly'],
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  classroom: {
    type: String
  },
  exams: [{
    subject: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    room: {
      type: String
    },
    duration: {
      type: Number // بالدقائق
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);
const ExamSchedule = mongoose.model('ExamSchedule', ExamScheduleSchema);

module.exports = { Schedule, ExamSchedule };