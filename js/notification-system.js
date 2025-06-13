// نظام الإشعارات المتقدم

class NotificationSystem {
  constructor() {
    this.notifications = [];
    this.subscribers = new Map(); // Map of userId -> callback functions
    this.settings = {
      enableSound: true,
      enableDesktop: true,
      enableEmail: false,
      autoMarkAsRead: false,
      notificationDuration: 5000
    };
    this.init();
  }

  init() {
    // طلب إذن الإشعارات من المتصفح
    this.requestNotificationPermission();
    
    // تحميل الإشعارات المحفوظة
    this.loadNotifications();
    
    // إعداد الأصوات
    this.setupSounds();
  }

  // طلب إذن الإشعارات
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      this.settings.enableDesktop = permission === 'granted';
    }
  }

  // إعداد الأصوات
  setupSounds() {
    this.sounds = {
      homework: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
      lesson: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
      material: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
    };
  }

  // تحميل الإشعارات المحفوظة
  loadNotifications() {
    const saved = localStorage.getItem('school_notifications');
    if (saved) {
      this.notifications = JSON.parse(saved);
    }
  }

  // حفظ الإشعارات
  saveNotifications() {
    localStorage.setItem('school_notifications', JSON.stringify(this.notifications));
  }

  // إنشاء إشعار جديد
  createNotification(data) {
    const notification = {
      id: this.generateId(),
      title: data.title,
      message: data.message,
      type: data.type || 'info', // homework, lesson, material, info, warning, error
      documentId: data.documentId || null,
      senderId: data.senderId,
      senderName: data.senderName,
      recipientIds: data.recipientIds || [],
      createdDate: new Date().toISOString(),
      isRead: false,
      priority: data.priority || 'normal', // low, normal, high, urgent
      actionUrl: data.actionUrl || null,
      expiryDate: data.expiryDate || null,
      metadata: data.metadata || {}
    };

    this.notifications.push(notification);
    this.saveNotifications();

    // إرسال الإشعار للمستقبلين
    this.sendNotification(notification);

    return notification;
  }

  // إرسال الإشعار
  sendNotification(notification) {
    notification.recipientIds.forEach(recipientId => {
      // إشعار في المتصفح
      if (this.settings.enableDesktop) {
        this.showDesktopNotification(notification);
      }

      // تشغيل الصوت
      if (this.settings.enableSound) {
        this.playNotificationSound(notification.type);
      }

      // إشعار في الواجهة
      this.showInAppNotification(notification, recipientId);

      // استدعاء المشتركين
      if (this.subscribers.has(recipientId)) {
        const callbacks = this.subscribers.get(recipientId);
        callbacks.forEach(callback => callback(notification));
      }
    });
  }

  // إشعار سطح المكتب
  showDesktopNotification(notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const options = {
        body: notification.message,
        icon: this.getNotificationIcon(notification.type),
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.priority === 'urgent',
        actions: notification.actionUrl ? [
          { action: 'view', title: 'عرض' },
          { action: 'dismiss', title: 'إغلاق' }
        ] : []
      };

      const desktopNotification = new Notification(notification.title, options);

      desktopNotification.onclick = () => {
        if (notification.actionUrl) {
          window.open(notification.actionUrl, '_blank');
        }
        desktopNotification.close();
      };

      // إغلاق تلقائي
      setTimeout(() => {
        desktopNotification.close();
      }, this.settings.notificationDuration);
    }
  }

  // إشعار داخل التطبيق
  showInAppNotification(notification, recipientId) {
    // إنشاء عنصر الإشعار
    const notificationElement = this.createNotificationElement(notification);
    
    // إضافة الإشعار للصفحة
    this.addNotificationToPage(notificationElement);

    // إزالة تلقائية
    setTimeout(() => {
      this.removeNotificationFromPage(notificationElement);
    }, this.settings.notificationDuration);
  }

  // إنشاء عنصر الإشعار
  createNotificationElement(notification) {
    const element = document.createElement('div');
    element.className = `notification-toast notification-${notification.type} priority-${notification.priority}`;
    element.dataset.notificationId = notification.id;

    const icon = this.getNotificationIcon(notification.type);
    const priorityClass = notification.priority === 'urgent' ? 'urgent' : '';

    element.innerHTML = `
      <div class="notification-toast-content ${priorityClass}">
        <div class="notification-toast-icon">
          <i class="fas ${icon}"></i>
        </div>
        <div class="notification-toast-body">
          <div class="notification-toast-title">${notification.title}</div>
          <div class="notification-toast-message">${notification.message}</div>
          <div class="notification-toast-time">${this.formatTime(notification.createdDate)}</div>
        </div>
        <div class="notification-toast-actions">
          ${notification.actionUrl ? `
            <button class="notification-action-btn view-btn" onclick="window.open('${notification.actionUrl}', '_blank')">
              <i class="fas fa-eye"></i>
            </button>
          ` : ''}
          <button class="notification-action-btn close-btn" onclick="notificationSystem.dismissNotification('${notification.id}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;

    return element;
  }

  // إضافة الإشعار للصفحة
  addNotificationToPage(element) {
    let container = document.getElementById('notification-toast-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-toast-container';
      container.className = 'notification-toast-container';
      document.body.appendChild(container);
    }

    container.appendChild(element);

    // تأثير الظهور
    setTimeout(() => {
      element.classList.add('show');
    }, 100);
  }

  // إزالة الإشعار من الصفحة
  removeNotificationFromPage(element) {
    element.classList.add('hide');
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300);
  }

  // رفض الإشعار
  dismissNotification(notificationId) {
    const element = document.querySelector(`[data-notification-id="${notificationId}"]`);
    if (element) {
      this.removeNotificationFromPage(element);
    }
  }

  // تشغيل صوت الإشعار
  playNotificationSound(type) {
    if (this.sounds[type]) {
      this.sounds[type].play().catch(e => {
        console.log('Could not play notification sound:', e);
      });
    }
  }

  // الحصول على أيقونة الإشعار
  getNotificationIcon(type) {
    const icons = {
      homework: 'fa-tasks',
      lesson: 'fa-chalkboard-teacher',
      material: 'fa-book',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle',
      success: 'fa-check-circle'
    };
    return icons[type] || icons.info;
  }

  // الحصول على الإشعارات للمستخدم
  getNotificationsByUser(userId) {
    return this.notifications
      .filter(notification => notification.recipientIds.includes(userId))
      .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }

  // الحصول على الإشعارات غير المقروءة
  getUnreadNotifications(userId) {
    return this.getNotificationsByUser(userId)
      .filter(notification => !notification.isRead);
  }

  // عدد الإشعارات غير المقروءة
  getUnreadCount(userId) {
    return this.getUnreadNotifications(userId).length;
  }

  // تحديد الإشعار كمقروء
  markAsRead(notificationId, userId) {
    const notification = this.notifications.find(n => 
      n.id === notificationId && n.recipientIds.includes(userId)
    );
    
    if (notification) {
      notification.isRead = true;
      this.saveNotifications();
      
      // إشعار المشتركين بالتحديث
      this.notifySubscribers(userId, 'read', notification);
      
      return true;
    }
    
    return false;
  }

  // تحديد جميع الإشعارات كمقروءة
  markAllAsRead(userId) {
    const userNotifications = this.getNotificationsByUser(userId);
    let count = 0;
    
    userNotifications.forEach(notification => {
      if (!notification.isRead) {
        notification.isRead = true;
        count++;
      }
    });
    
    if (count > 0) {
      this.saveNotifications();
      this.notifySubscribers(userId, 'readAll', { count });
    }
    
    return count;
  }

  // حذف الإشعار
  deleteNotification(notificationId, userId) {
    const index = this.notifications.findIndex(n => 
      n.id === notificationId && n.recipientIds.includes(userId)
    );
    
    if (index !== -1) {
      const notification = this.notifications[index];
      this.notifications.splice(index, 1);
      this.saveNotifications();
      
      this.notifySubscribers(userId, 'delete', notification);
      
      return true;
    }
    
    return false;
  }

  // الاشتراك في الإشعارات
  subscribe(userId, callback) {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, []);
    }
    
    this.subscribers.get(userId).push(callback);
    
    // إرجاع دالة إلغاء الاشتراك
    return () => {
      const callbacks = this.subscribers.get(userId);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  // إشعار المشتركين
  notifySubscribers(userId, action, data) {
    if (this.subscribers.has(userId)) {
      const callbacks = this.subscribers.get(userId);
      callbacks.forEach(callback => {
        callback({ action, data, userId });
      });
    }
  }

  // إنشاء إشعار للواجب الجديد
  createHomeworkNotification(homework, recipientIds) {
    return this.createNotification({
      title: `واجب جديد في ${homework.subject}`,
      message: `تم إضافة واجب جديد: ${homework.title}`,
      type: 'homework',
      documentId: homework.id,
      senderId: homework.teacherId,
      senderName: homework.teacherName,
      recipientIds: recipientIds,
      priority: homework.priority || 'normal',
      actionUrl: `#homework/${homework.id}`,
      metadata: {
        subject: homework.subject,
        dueDate: homework.dueDate,
        classrooms: homework.classrooms
      }
    });
  }

  // إنشاء إشعار للدرس الجديد
  createLessonNotification(lesson, recipientIds) {
    return this.createNotification({
      title: `درس جديد في ${lesson.subject}`,
      message: `تم إضافة درس جديد: ${lesson.title}`,
      type: 'lesson',
      documentId: lesson.id,
      senderId: lesson.teacherId,
      senderName: lesson.teacherName,
      recipientIds: recipientIds,
      priority: lesson.priority || 'normal',
      actionUrl: `#lesson/${lesson.id}`,
      metadata: {
        subject: lesson.subject,
        classrooms: lesson.classrooms
      }
    });
  }

  // إنشاء إشعار للمادة التعليمية الجديدة
  createMaterialNotification(material, recipientIds) {
    return this.createNotification({
      title: `مادة تعليمية جديدة في ${material.subject}`,
      message: `تم إضافة مادة تعليمية جديدة: ${material.title}`,
      type: 'material',
      documentId: material.id,
      senderId: material.teacherId,
      senderName: material.teacherName,
      recipientIds: recipientIds,
      priority: material.priority || 'normal',
      actionUrl: `#material/${material.id}`,
      metadata: {
        subject: material.subject,
        classrooms: material.classrooms
      }
    });
  }

  // إنشاء إشعار تذكير بموعد التسليم
  createDueDateReminderNotification(homework, recipientIds, daysLeft) {
    const urgency = daysLeft <= 1 ? 'urgent' : daysLeft <= 3 ? 'high' : 'normal';
    const message = daysLeft === 0 ? 
      `موعد تسليم الواجب اليوم: ${homework.title}` :
      `متبقي ${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'} على موعد تسليم الواجب: ${homework.title}`;

    return this.createNotification({
      title: `تذكير: موعد التسليم`,
      message: message,
      type: 'homework',
      documentId: homework.id,
      senderId: 'system',
      senderName: 'النظام',
      recipientIds: recipientIds,
      priority: urgency,
      actionUrl: `#homework/${homework.id}`,
      metadata: {
        reminderType: 'dueDate',
        daysLeft: daysLeft,
        dueDate: homework.dueDate
      }
    });
  }

  // تنسيق الوقت
  formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    
    return date.toLocaleDateString('ar-SA');
  }

  // إنشاء معرف فريد
  generateId() {
    return 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // تحديث الإعدادات
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('notification_settings', JSON.stringify(this.settings));
  }

  // تحميل الإعدادات
  loadSettings() {
    const saved = localStorage.getItem('notification_settings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }

  // مسح الإشعارات القديمة
  cleanupOldNotifications(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const initialCount = this.notifications.length;
    this.notifications = this.notifications.filter(notification => {
      const notificationDate = new Date(notification.createdDate);
      return notificationDate > cutoffDate;
    });

    const removedCount = initialCount - this.notifications.length;
    if (removedCount > 0) {
      this.saveNotifications();
    }

    return removedCount;
  }
}

// إنشاء مثيل عام لنظام الإشعارات
window.notificationSystem = new NotificationSystem();

// CSS للإشعارات المنبثقة
const notificationStyles = `
  .notification-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    pointer-events: none;
  }

  .notification-toast {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    margin-bottom: 10px;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    pointer-events: auto;
    border-left: 4px solid #3498db;
    overflow: hidden;
  }

  .notification-toast.show {
    transform: translateX(0);
  }

  .notification-toast.hide {
    transform: translateX(100%);
    opacity: 0;
  }

  .notification-toast.notification-homework {
    border-left-color: #f39c12;
  }

  .notification-toast.notification-lesson {
    border-left-color: #2ecc71;
  }

  .notification-toast.notification-material {
    border-left-color: #17a2b8;
  }

  .notification-toast.notification-warning {
    border-left-color: #f39c12;
  }

  .notification-toast.notification-error {
    border-left-color: #e74c3c;
  }

  .notification-toast.notification-success {
    border-left-color: #2ecc71;
  }

  .notification-toast.priority-urgent {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
    50% { box-shadow: 0 8px 32px rgba(231, 76, 60, 0.3); }
    100% { box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
  }

  .notification-toast-content {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;
  }

  .notification-toast-content.urgent {
    background: linear-gradient(135deg, #fff, #fff5f5);
  }

  .notification-toast-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
    background: #3498db;
  }

  .notification-homework .notification-toast-icon {
    background: #f39c12;
  }

  .notification-lesson .notification-toast-icon {
    background: #2ecc71;
  }

  .notification-material .notification-toast-icon {
    background: #17a2b8;
  }

  .notification-warning .notification-toast-icon {
    background: #f39c12;
  }

  .notification-error .notification-toast-icon {
    background: #e74c3c;
  }

  .notification-success .notification-toast-icon {
    background: #2ecc71;
  }

  .notification-toast-body {
    flex: 1;
    min-width: 0;
  }

  .notification-toast-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 4px;
    font-size: 14px;
  }

  .notification-toast-message {
    color: #666;
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 6px;
  }

  .notification-toast-time {
    color: #999;
    font-size: 11px;
  }

  .notification-toast-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .notification-action-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    transition: all 0.2s;
  }

  .notification-action-btn.view-btn {
    background: #e3f2fd;
    color: #1976d2;
  }

  .notification-action-btn.view-btn:hover {
    background: #bbdefb;
  }

  .notification-action-btn.close-btn {
    background: #f5f5f5;
    color: #666;
  }

  .notification-action-btn.close-btn:hover {
    background: #eeeeee;
    color: #333;
  }

  @media (max-width: 768px) {
    .notification-toast-container {
      right: 10px;
      left: 10px;
      max-width: none;
    }
    
    .notification-toast-content {
      padding: 12px;
    }
    
    .notification-toast-icon {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }
  }
`;

// إضافة الأنماط للصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// تصدير النظام
window.NotificationSystem = NotificationSystem;