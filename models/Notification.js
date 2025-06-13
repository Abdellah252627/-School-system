const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'academic', 'financial', 'urgent', 'event'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date
    },
    isRead: {
      type: Boolean,
      default: false
    }
  }],
  targetRole: {
    type: String,
    enum: ['all', 'admin', 'teacher', 'student', 'parent']
  },
  targetGrade: {
    type: String // إذا كان الإشعار خاص بصف معين
  },
  targetClassroom: {
    type: String // إذا كان الإشعار خاص بفصل معين
  },
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number
  }],
  scheduledFor: {
    type: Date // للإشعارات المجدولة
  },
  expiresAt: {
    type: Date // تاريخ انتهاء صلاحية الإشعار
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);