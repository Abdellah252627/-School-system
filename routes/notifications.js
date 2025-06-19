const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
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

// الحصول على إشعارات المستخدم
router.get('/my', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userRole = req.session.user.role;
    
    // البحث عن الإشعارات المرسلة للمستخدم مباشرة أو حسب الدور
    const notifications = await Notification.find({
      $or: [
        { 'recipients.user': userId },
        { targetRole: userRole },
        { targetRole: 'all' }
      ],
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    }).populate('sender', 'name role')
      .sort({ createdAt: -1 });
    
    // تحديد حالة القراءة لكل إشعار
    const notificationsWithReadStatus = notifications.map(notification => {
      const recipient = notification.recipients.find(r => 
        r.user && r.user.toString() === userId
      );
      
      return {
        ...notification.toObject(),
        isRead: recipient ? recipient.isRead : false,
        readAt: recipient ? recipient.readAt : null
      };
    });
    
    res.json(notificationsWithReadStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إنشاء إشعار جديد
router.post('/', isAdminOrTeacher, async (req, res) => {
  try {
    const {
      title,
      message,
      type,
      priority,
      targetRole,
      targetGrade,
      targetClassroom,
      specificUsers,
      scheduledFor,
      expiresAt
    } = req.body;
    
    const notification = new Notification({
      title,
      message,
      type,
      priority: priority || 'medium',
      sender: req.session.user.id,
      targetRole,
      targetGrade,
      targetClassroom,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined
    });
    
    // إضافة المستلمين المحددين
    if (specificUsers && specificUsers.length > 0) {
      notification.recipients = specificUsers.map(userId => ({
        user: userId,
        isRead: false
      }));
    } else {
      // تحديد المستلمين حسب الدور أو الصف
      let users = [];
      
      if (targetRole && targetRole !== 'all') {
        users = await User.find({ role: targetRole }).select('_id');
      } else if (targetGrade || targetClassroom) {
        // البحث عن الطلاب في الصف أو الفصل المحدد
        let studentQuery = {};
        if (targetGrade) studentQuery.grade = targetGrade;
        if (targetClassroom) studentQuery.classroom = targetClassroom;
        
        const students = await Student.find(studentQuery).populate('user parent');
        
        // إضافة الطلاب وأولياء الأمور
        students.forEach(student => {
          users.push({ _id: student.user._id });
          if (student.parent) {
            users.push({ _id: student.parent._id });
          }
        });
        
        // إضافة المعلمين إذا كان الإشعار أكاديمي
        if (type === 'academic') {
          const teachers = await User.find({ role: 'teacher' }).select('_id');
          users = users.concat(teachers);
        }
      } else {
        // جميع المستخدمين
        users = await User.find().select('_id');
      }
      
      notification.recipients = users.map(user => ({
        user: user._id,
        isRead: false
      }));
    }
    
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تحديد إشعار كمقروء
router.put('/:id/read', async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.session.user.id;
    
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // البحث عن المستلم في قائمة المستلمين
    const recipient = notification.recipients.find(r => 
      r.user && r.user.toString() === userId
    );
    
    if (recipient) {
      recipient.isRead = true;
      recipient.readAt = new Date();
      await notification.save();
    }
    
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تحديد جميع الإشعارات كمقروءة
router.put('/mark-all-read', async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    await Notification.updateMany(
      { 'recipients.user': userId },
      { 
        $set: { 
          'recipients.$.isRead': true,
          'recipients.$.readAt': new Date()
        }
      }
    );
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جميع الإشعارات (للمدير والمعلم)
router.get('/all', isAdminOrTeacher, async (req, res) => {
  try {
    const { type, priority, targetRole } = req.query;
    let query = { isActive: true };
    
    if (type) query.type = type;
    if (priority) query.priority = priority;
    if (targetRole) query.targetRole = targetRole;
    
    const notifications = await Notification.find(query)
      .populate('sender', 'name role')
      .sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// حذف إشعار
router.delete('/:id', isAdminOrTeacher, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // التحقق من الصلاحية - المرسل أو المدير فقط
    if (notification.sender.toString() !== req.session.user.id && 
        req.session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    notification.isActive = false;
    await notification.save();
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إحصائيات الإشعارات
router.get('/stats', isAdminOrTeacher, async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments({ isActive: true });
    
    const notificationsByType = await Notification.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const notificationsByPriority = await Notification.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    const recentNotifications = await Notification.find({ isActive: true })
      .populate('sender', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalNotifications,
      notificationsByType,
      notificationsByPriority,
      recentNotifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على عدد الإشعارات غير المقروءة
router.get('/unread-count', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userRole = req.session.user.role;
    
    const unreadCount = await Notification.countDocuments({
      $or: [
        { 
          'recipients.user': userId,
          'recipients.isRead': false
        },
        { 
          targetRole: userRole,
          'recipients.user': { $ne: userId }
        },
        { 
          targetRole: 'all',
          'recipients.user': { $ne: userId }
        }
      ],
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    });
    
    res.json({ unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;