// نظام إدارة الوثائق والملفات التعليمية

// هيكل بيانات النظام
const documentSystem = {
  // المستندات (الواجبات والدروس)
  documents: [
    {
      id: "doc1",
      title: "واجب الرياضيات - الجبر",
      type: "homework", // homework, lesson, material
      subject: "الرياضيات",
      grade: "الصف التاسع",
      description: "حل التمارين من صفحة 25 إلى 27",
      teacherId: "teacher1",
      teacherName: "أحمد المعلم",
      classrooms: ["9أ", "9ب"],
      files: [
        {
          id: "file1",
          name: "واجب_الجبر.pdf",
          type: "application/pdf",
          size: 1024000,
          url: "#",
          uploadDate: "2024-05-08T10:00:00Z"
        }
      ],
      dueDate: "2024-05-15",
      createdDate: "2024-05-08",
      status: "active", // active, closed, draft
      priority: "normal", // low, normal, high, urgent
      tags: ["جبر", "تمارين", "واجب منزلي"]
    },
    {
      id: "doc2",
      title: "درس الضوء والألوان",
      type: "lesson",
      subject: "العلوم",
      grade: "الصف التاسع",
      description: "شرح مفصل عن انكسار الضوء وتحليل الألوان",
      teacherId: "teacher2",
      teacherName: "فاطمة المعلمة",
      classrooms: ["9أ", "9ج"],
      files: [
        {
          id: "file2",
          name: "درس_الضوء.pdf",
          type: "application/pdf",
          size: 2048000,
          url: "#",
          uploadDate: "2024-05-09T14:30:00Z"
        },
        {
          id: "file3",
          name: "تجارب_الضوء.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 512000,
          url: "#",
          uploadDate: "2024-05-09T14:35:00Z"
        }
      ],
      createdDate: "2024-05-09",
      status: "active",
      priority: "normal",
      tags: ["ضوء", "فيزياء", "تجارب"]
    },
    {
      id: "doc3",
      title: "مراجعة قواعد النحو",
      type: "material",
      subject: "اللغة العربية",
      grade: "الصف التاسع",
      description: "مراجعة شاملة لقواعد النحو والإعراب",
      teacherId: "teacher3",
      teacherName: "محمد الأستاذ",
      classrooms: ["9أ", "9ب", "9ج"],
      files: [
        {
          id: "file4",
          name: "قواعد_النحو.pdf",
          type: "application/pdf",
          size: 1536000,
          url: "#",
          uploadDate: "2024-05-10T09:15:00Z"
        }
      ],
      createdDate: "2024-05-10",
      status: "active",
      priority: "high",
      tags: ["نحو", "قواعد", "إعراب"]
    }
  ],

  // المستخدمون
  users: [
    {
      id: "teacher1",
      name: "أحمد المعلم",
      role: "teacher",
      email: "ahmed.teacher@school.edu",
      subjects: ["الرياضيات"],
      classrooms: ["9أ", "9ب"]
    },
    {
      id: "teacher2",
      name: "فاطمة المعلمة",
      role: "teacher",
      email: "fatima.teacher@school.edu",
      subjects: ["العلوم"],
      classrooms: ["9أ", "9ج"]
    },
    {
      id: "teacher3",
      name: "محمد الأستاذ",
      role: "teacher",
      email: "mohammed.teacher@school.edu",
      subjects: ["اللغة العربية"],
      classrooms: ["9أ", "9ب", "9ج"]
    },
    {
      id: "student1",
      name: "علي الطالب",
      role: "student",
      email: "ali.student@school.edu",
      classroom: "9أ",
      parentId: "parent1"
    },
    {
      id: "student2",
      name: "سارة الطالبة",
      role: "student",
      email: "sara.student@school.edu",
      classroom: "9ب",
      parentId: "parent2"
    },
    {
      id: "parent1",
      name: "والد علي",
      role: "parent",
      email: "ali.parent@email.com",
      studentIds: ["student1"]
    },
    {
      id: "parent2",
      name: "والدة سارة",
      role: "parent",
      email: "sara.parent@email.com",
      studentIds: ["student2"]
    }
  ],

  // الإشعارات
  notifications: [
    {
      id: "notif1",
      title: "واجب جديد في الرياضيات",
      message: "تم إضافة واجب جديد: واجب الرياضيات - الجبر",
      type: "homework",
      documentId: "doc1",
      senderId: "teacher1",
      recipientIds: ["student1", "student2", "parent1", "parent2"],
      createdDate: "2024-05-08T10:05:00Z",
      isRead: false,
      priority: "normal"
    }
  ]
};

// فئة إدارة الوثائق
class DocumentManager {
  constructor() {
    this.documents = documentSystem.documents;
    this.users = documentSystem.users;
    this.notifications = documentSystem.notifications;
    this.allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint'
    ];
    this.allowedExtensions = ['.pdf', '.docx', '.doc', '.pptx', '.ppt'];
    this.maxFileSize = 50 * 1024 * 1024; // 50MB
  }

  // إضافة وثيقة جديدة
  addDocument(documentData, files) {
    const id = "doc" + (this.documents.length + 1);
    const newDocument = {
      id,
      ...documentData,
      files: files || [],
      createdDate: new Date().toISOString(),
      status: "active"
    };

    this.documents.push(newDocument);
    
    // إرسال إشعارات
    this.sendNotifications(newDocument);
    
    return newDocument;
  }

  // الحصول على الوثائق حسب المستخدم
  getDocumentsByUser(userId, userRole) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return [];

    switch (userRole) {
      case 'teacher':
        return this.documents.filter(doc => doc.teacherId === userId);
      
      case 'student':
        return this.documents.filter(doc => 
          doc.classrooms.includes(user.classroom)
        );
      
      case 'parent':
        const studentIds = user.studentIds;
        const studentClassrooms = this.users
          .filter(u => studentIds.includes(u.id))
          .map(s => s.classroom);
        
        return this.documents.filter(doc => 
          doc.classrooms.some(classroom => studentClassrooms.includes(classroom))
        );
      
      default:
        return [];
    }
  }

  // الحصول على الوثائق حسب النوع
  getDocumentsByType(type, userId = null, userRole = null) {
    let documents = this.documents.filter(doc => doc.type === type);
    
    if (userId && userRole) {
      const userDocuments = this.getDocumentsByUser(userId, userRole);
      documents = documents.filter(doc => 
        userDocuments.some(userDoc => userDoc.id === doc.id)
      );
    }
    
    return documents;
  }

  // البحث في الوثائق
  searchDocuments(query, filters = {}) {
    let results = this.documents;

    // البحث النصي
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.subject.toLowerCase().includes(searchTerm) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // تطبيق المرشحات
    if (filters.type) {
      results = results.filter(doc => doc.type === filters.type);
    }
    
    if (filters.subject) {
      results = results.filter(doc => doc.subject === filters.subject);
    }
    
    if (filters.grade) {
      results = results.filter(doc => doc.grade === filters.grade);
    }
    
    if (filters.teacherId) {
      results = results.filter(doc => doc.teacherId === filters.teacherId);
    }

    return results;
  }

  // التحقق من صحة الملف
  validateFile(file) {
    const errors = [];
    
    // التحقق من نوع الملف
    if (!this.allowedTypes.includes(file.type)) {
      errors.push('نوع الملف غير مدعوم. يُسمح بملفات PDF و Word و PowerPoint فقط');
    }
    
    // التحقق من امتداد الملف
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!this.allowedExtensions.includes(fileExtension)) {
      errors.push('امتداد الملف غير مدعوم');
    }
    
    // التحقق من حجم الملف
    if (file.size > this.maxFileSize) {
      errors.push('حجم الملف يجب أن يكون أقل من 50MB');
    }
    
    return errors;
  }

  // إرسال الإشعارات
  sendNotifications(document) {
    const recipients = this.getNotificationRecipients(document);
    
    recipients.forEach(recipient => {
      const notification = {
        id: "notif" + (this.notifications.length + 1),
        title: this.getNotificationTitle(document),
        message: this.getNotificationMessage(document),
        type: document.type,
        documentId: document.id,
        senderId: document.teacherId,
        recipientIds: [recipient.id],
        createdDate: new Date().toISOString(),
        isRead: false,
        priority: document.priority || 'normal'
      };
      
      this.notifications.push(notification);
    });
  }

  // الحصول على مستقبلي الإشعارات
  getNotificationRecipients(document) {
    const recipients = [];
    
    // الطلاب في الفصول المحددة
    const students = this.users.filter(user => 
      user.role === 'student' && 
      document.classrooms.includes(user.classroom)
    );
    
    recipients.push(...students);
    
    // أولياء أمور الطلاب
    const parentIds = students.map(student => student.parentId).filter(Boolean);
    const parents = this.users.filter(user => 
      user.role === 'parent' && 
      parentIds.includes(user.id)
    );
    
    recipients.push(...parents);
    
    return recipients;
  }

  // إنشاء عنوان الإشعار
  getNotificationTitle(document) {
    const typeNames = {
      homework: 'واجب جديد',
      lesson: 'درس جديد',
      material: 'مادة تعليمية جديدة'
    };
    
    return `${typeNames[document.type]} في ${document.subject}`;
  }

  // إنشاء رسالة الإشعار
  getNotificationMessage(document) {
    return `تم إضافة ${document.type === 'homework' ? 'واجب' : document.type === 'lesson' ? 'درس' : 'مادة'} جديد: ${document.title}`;
  }

  // الحصول على الإشعارات للمستخدم
  getNotificationsByUser(userId) {
    return this.notifications.filter(notif => 
      notif.recipientIds.includes(userId)
    ).sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }

  // تحديد الإشعار كمقروء
  markNotificationAsRead(notificationId, userId) {
    const notification = this.notifications.find(n => 
      n.id === notificationId && n.recipientIds.includes(userId)
    );
    
    if (notification) {
      notification.isRead = true;
      return true;
    }
    
    return false;
  }

  // تحديد جميع الإشعارات كمقروءة
  markAllNotificationsAsRead(userId) {
    const userNotifications = this.notifications.filter(n => 
      n.recipientIds.includes(userId)
    );
    
    userNotifications.forEach(notification => {
      notification.isRead = true;
    });
    
    return userNotifications.length;
  }

  // الحصول على عدد الإشعارات غير المقروءة
  getUnreadNotificationsCount(userId) {
    return this.notifications.filter(notif => 
      notif.recipientIds.includes(userId) && !notif.isRead
    ).length;
  }

  // تنسيق حجم الملف
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // الحصول على أيقونة الملف
  getFileIcon(fileType) {
    const iconMap = {
      'application/pdf': 'fa-file-pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fa-file-word',
      'application/msword': 'fa-file-word',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'fa-file-powerpoint',
      'application/vnd.ms-powerpoint': 'fa-file-powerpoint'
    };
    
    return iconMap[fileType] || 'fa-file';
  }

  // الحصول على لون الأولوية
  getPriorityColor(priority) {
    const colorMap = {
      low: '#28a745',
      normal: '#17a2b8',
      high: '#ffc107',
      urgent: '#dc3545'
    };
    
    return colorMap[priority] || colorMap.normal;
  }
}

// فئة إدارة رفع الملفات المتقدمة
class AdvancedFileUploadManager {
  constructor() {
    this.uploadedFiles = [];
    this.documentManager = new DocumentManager();
  }

  // إضافة ملف مع التحقق المتقدم
  addFile(file) {
    const errors = this.documentManager.validateFile(file);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const fileData = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadDate: new Date(),
      status: 'ready',
      icon: this.documentManager.getFileIcon(file.type)
    };

    this.uploadedFiles.push(fileData);
    return { success: true, file: fileData };
  }

  // الحصول على الملفات
  getFiles() {
    return this.uploadedFiles;
  }

  // حذف ملف
  removeFile(fileId) {
    const index = this.uploadedFiles.findIndex(f => f.id === fileId);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
      return true;
    }
    return false;
  }

  // مسح جميع الملفات
  clearFiles() {
    this.uploadedFiles = [];
  }

  // تحويل الملفات لتنسيق قابل للحفظ
  getFilesForSave() {
    return this.uploadedFiles.map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      size: f.size,
      url: '#', // في التطبيق الحقيقي، سيكون رابط الملف المحفوظ
      uploadDate: f.uploadDate.toISOString()
    }));
  }
}

// تصدير النظام
window.documentSystem = {
  DocumentManager,
  AdvancedFileUploadManager,
  data: documentSystem
};

// إنشاء مثيل عام
window.globalDocumentManager = new DocumentManager();
window.globalFileUploadManager = new AdvancedFileUploadManager();