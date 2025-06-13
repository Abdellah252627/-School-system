// نظام الواجبات المنزلية

// هيكل بيانات الواجبات المنزلية (بيانات محاكاة)
const homeworkData = {
  // قائمة الواجبات
  assignments: [
    {
      id: "hw1",
      title: "مراجعة درس الجبر",
      subject: "الرياضيات",
      grade: "الصف التاسع",
      description: "حل التمارين من صفحة 25 إلى صفحة 27 في كتاب الرياضيات",
      teacherId: "2", // أحمد المعلم
      dueDate: "2024-05-15",
      assignedDate: "2024-05-08",
      classrooms: ["9أ", "9ب"],
      attachments: [
        { name: "ورقة عمل الجبر.pdf", size: "1.2MB", url: "#" }
      ],
      status: "active"
    },
    {
      id: "hw2",
      title: "تجربة الضوء والألوان",
      subject: "العلوم",
      grade: "الصف التاسع",
      description: "إجراء تجربة انكسار الضوء وكتابة تقرير عن النتائج في حدود صفحتين",
      teacherId: "2", // أحمد المعلم
      dueDate: "2024-05-20",
      assignedDate: "2024-05-10",
      classrooms: ["9أ"],
      attachments: [
        { name: "دليل التجربة.pdf", size: "2.4MB", url: "#" },
        { name: "نموذج التقرير.docx", size: "0.5MB", url: "#" }
      ],
      status: "active"
    },
    {
      id: "hw3",
      title: "تلخيص قصة",
      subject: "اللغة العربية",
      grade: "الصف التاسع",
      description: "قراءة قصة 'الأيام' لطه حسين وتلخيص الفصل الأول في صفحة واحدة",
      teacherId: "2", // أحمد المعلم
      dueDate: "2024-05-12",
      assignedDate: "2024-05-05",
      classrooms: ["9أ", "9ب", "9ج"],
      attachments: [],
      status: "closed"
    }
  ],
  
  // قائمة تسليمات الطلاب
  submissions: [
    {
      id: "sub1",
      homeworkId: "hw3",
      studentId: "3", // محمد الطالب
      submissionDate: "2024-05-11",
      status: "submitted",
      grade: 85,
      teacherFeedback: "تلخيص جيد، لكن يحتاج إلى مزيد من التفاصيل حول شخصيات القصة",
      files: [
        { name: "تلخيص قصة الأيام.pdf", size: "0.8MB", url: "#" }
      ]
    },
    {
      id: "sub2",
      homeworkId: "hw1",
      studentId: "3", // محمد الطالب
      submissionDate: null,
      status: "pending",
      grade: null,
      teacherFeedback: "",
      files: []
    }
  ]
};

// الحصول على الواجبات المنزلية حسب الفصل
function getHomeworkByClassroom(classroom) {
  return homeworkData.assignments.filter(hw => hw.classrooms.includes(classroom));
}

// الحصول على الواجبات المنزلية حسب الطالب
function getHomeworkByStudent(studentId) {
  // نفترض أن الطالب موجود في الفصل 9أ
  const studentClassroom = "9أ";
  const homeworkList = getHomeworkByClassroom(studentClassroom);
  
  // إضافة معلومات التسليم لكل واجب
  return homeworkList.map(hw => {
    const submission = homeworkData.submissions.find(
      sub => sub.homeworkId === hw.id && sub.studentId === studentId
    );
    
    return {
      ...hw,
      submission: submission || {
        status: "not_submitted",
        grade: null,
        teacherFeedback: "",
        files: []
      }
    };
  });
}

// الحصول على الواجبات المنزلية حسب المعلم
function getHomeworkByTeacher(teacherId) {
  return homeworkData.assignments.filter(hw => hw.teacherId === teacherId);
}

// الحصول على تسليمات واجب منزلي معين
function getSubmissionsByHomework(homeworkId) {
  return homeworkData.submissions.filter(sub => sub.homeworkId === homeworkId);
}

// إضافة واجب منزلي جديد
function addHomework(homeworkData) {
  const id = "hw" + (homeworkData.assignments.length + 1);
  const newHomework = {
    id,
    ...homeworkData,
    assignedDate: new Date().toISOString().split('T')[0],
    status: "active"
  };
  
  homeworkData.assignments.push(newHomework);
  return newHomework;
}

// تسليم واجب منزلي من طالب
function submitHomework(homeworkId, studentId, files) {
  const id = "sub" + (homeworkData.submissions.length + 1);
  const submission = {
    id,
    homeworkId,
    studentId,
    submissionDate: new Date().toISOString().split('T')[0],
    status: "submitted",
    grade: null,
    teacherFeedback: "",
    files
  };
  
  // التحقق مما إذا كان التسليم موجوداً بالفعل
  const existingSubmissionIndex = homeworkData.submissions.findIndex(
    sub => sub.homeworkId === homeworkId && sub.studentId === studentId
  );
  
  if (existingSubmissionIndex !== -1) {
    // تحديث التسليم الموجود
    homeworkData.submissions[existingSubmissionIndex] = {
      ...homeworkData.submissions[existingSubmissionIndex],
      submissionDate: submission.submissionDate,
      status: "submitted",
      files
    };
    return homeworkData.submissions[existingSubmissionIndex];
  } else {
    // إضافة تسليم جديد
    homeworkData.submissions.push(submission);
    return submission;
  }
}

// تقييم تسليم واجب منزلي
function gradeSubmission(submissionId, grade, feedback) {
  const submissionIndex = homeworkData.submissions.findIndex(sub => sub.id === submissionId);
  
  if (submissionIndex !== -1) {
    homeworkData.submissions[submissionIndex].grade = grade;
    homeworkData.submissions[submissionIndex].teacherFeedback = feedback;
    homeworkData.submissions[submissionIndex].status = "graded";
    return homeworkData.submissions[submissionIndex];
  }
  
  return null;
}

// إغلاق واجب منزلي (انتهاء المدة)
function closeHomework(homeworkId) {
  const homeworkIndex = homeworkData.assignments.findIndex(hw => hw.id === homeworkId);
  
  if (homeworkIndex !== -1) {
    homeworkData.assignments[homeworkIndex].status = "closed";
    return homeworkData.assignments[homeworkIndex];
  }
  
  return null;
}

// إدارة رفع الملفات
class FileUploadManager {
  constructor() {
    this.uploadedFiles = [];
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.allowedTypes = ['application/pdf'];
    this.allowedExtensions = ['.pdf'];
  }

  // التحقق من صحة الملف
  validateFile(file) {
    const errors = [];
    
    // التحقق من نوع الملف
    if (!this.allowedTypes.includes(file.type)) {
      errors.push('يُسمح فقط بملفات PDF');
    }
    
    // التحقق من امتداد الملف
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!this.allowedExtensions.includes(fileExtension)) {
      errors.push('يُسمح فقط بملفات PDF');
    }
    
    // التحقق من حجم الملف
    if (file.size > this.maxFileSize) {
      errors.push('حجم الملف يجب أن يكون أقل من 10MB');
    }
    
    // التحقق من وجود الملف مسبقاً
    if (this.uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
      errors.push('هذا الملف مرفوع بالفعل');
    }
    
    return errors;
  }

  // إضافة ملف
  addFile(file) {
    const errors = this.validateFile(file);
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
      status: 'ready'
    };

    this.uploadedFiles.push(fileData);
    return { success: true, file: fileData };
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

  // الحصول على جميع الملفات
  getFiles() {
    return this.uploadedFiles;
  }

  // مسح جميع الملفات
  clearFiles() {
    this.uploadedFiles = [];
  }

  // تحويل حجم الملف إلى نص قابل للقراءة
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// إدارة واجهة رفع الملفات
class FileUploadUI {
  constructor(containerId, fileManager) {
    this.container = document.getElementById(containerId);
    this.fileManager = fileManager;
    this.init();
  }

  init() {
    this.createUploadInterface();
    this.bindEvents();
  }

  createUploadInterface() {
    this.container.innerHTML = `
      <div class="file-upload-container">
        <div class="file-dropzone" id="file-dropzone">
          <div class="dropzone-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>رفع ملفات PDF</h3>
            <p>اسحب وأفلت ملفات PDF هنا أو انقر للاختيار</p>
            <p class="file-restrictions">الحد الأقصى: 10MB لكل ملف | PDF فقط</p>
          </div>
          <input type="file" id="file-input" accept=".pdf" multiple style="display: none;">
        </div>
        
        <div class="uploaded-files" id="uploaded-files">
          <h4>الملفات المرفوعة:</h4>
          <div class="files-list" id="files-list"></div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const dropzone = this.container.querySelector('#file-dropzone');
    const fileInput = this.container.querySelector('#file-input');

    // أحداث السحب والإفلات
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      this.handleFiles(e.dataTransfer.files);
    });

    // النقر لاختيار الملفات
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      this.handleFiles(e.target.files);
    });
  }

  handleFiles(files) {
    Array.from(files).forEach(file => {
      const result = this.fileManager.addFile(file);
      if (result.success) {
        this.addFileToUI(result.file);
        this.showMessage('تم رفع الملف بنجاح', 'success');
      } else {
        this.showMessage(result.errors.join(', '), 'error');
      }
    });
  }

  addFileToUI(fileData) {
    const filesList = this.container.querySelector('#files-list');
    const fileElement = document.createElement('div');
    fileElement.className = 'file-item';
    fileElement.dataset.fileId = fileData.id;
    
    fileElement.innerHTML = `
      <div class="file-info">
        <div class="file-icon">
          <i class="fas fa-file-pdf"></i>
        </div>
        <div class="file-details">
          <div class="file-name">${fileData.name}</div>
          <div class="file-meta">
            <span class="file-size">${this.fileManager.formatFileSize(fileData.size)}</span>
            <span class="file-date">${fileData.uploadDate.toLocaleString('ar-SA')}</span>
          </div>
        </div>
      </div>
      <div class="file-actions">
        <button class="btn btn-sm btn-preview" onclick="previewFile('${fileData.id}')">
          <i class="fas fa-eye"></i> معاينة
        </button>
        <button class="btn btn-sm btn-danger" onclick="removeFile('${fileData.id}')">
          <i class="fas fa-trash"></i> حذف
        </button>
      </div>
    `;

    filesList.appendChild(fileElement);
    this.updateFilesVisibility();
  }

  removeFileFromUI(fileId) {
    const fileElement = this.container.querySelector(`[data-file-id="${fileId}"]`);
    if (fileElement) {
      fileElement.remove();
      this.updateFilesVisibility();
    }
  }

  updateFilesVisibility() {
    const uploadedFilesSection = this.container.querySelector('#uploaded-files');
    const filesList = this.container.querySelector('#files-list');
    
    if (filesList.children.length > 0) {
      uploadedFilesSection.style.display = 'block';
    } else {
      uploadedFilesSection.style.display = 'none';
    }
  }

  showMessage(message, type) {
    // إنشاء رسالة تنبيه
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;

    // إضافة الرسالة إلى أعلى الحاوية
    this.container.insertBefore(messageDiv, this.container.firstChild);

    // إزالة الرسالة بعد 5 ثوان
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  clearFiles() {
    const filesList = this.container.querySelector('#files-list');
    filesList.innerHTML = '';
    this.updateFilesVisibility();
  }
}

// إنشاء مدير الملفات العام
const globalFileManager = new FileUploadManager();

// وظائف عامة للاستخدام في HTML
window.removeFile = function(fileId) {
  if (globalFileManager.removeFile(fileId)) {
    const fileUploadUI = window.currentFileUploadUI;
    if (fileUploadUI) {
      fileUploadUI.removeFileFromUI(fileId);
      fileUploadUI.showMessage('تم حذف الملف بنجاح', 'success');
    }
  }
};

window.previewFile = function(fileId) {
  const file = globalFileManager.getFiles().find(f => f.id == fileId);
  if (file && file.file) {
    const fileURL = URL.createObjectURL(file.file);
    window.open(fileURL, '_blank');
  }
};

// تحسين وظيفة تسليم الواجب
function submitHomeworkWithFiles(homeworkId, studentId, notes = '') {
  const files = globalFileManager.getFiles();
  
  if (files.length === 0) {
    alert('يرجى رفع ملف PDF واحد على الأقل');
    return false;
  }

  // تحويل الملفات إلى تنسيق مناسب للحفظ
  const fileData = files.map(f => ({
    name: f.name,
    size: globalFileManager.formatFileSize(f.size),
    uploadDate: f.uploadDate.toISOString(),
    url: '#' // في التطبيق الحقيقي، سيكون هذا رابط الملف المحفوظ
  }));

  // استخدام الوظيفة الأصلية مع الملفات الجديدة
  const result = submitHomework(homeworkId, studentId, fileData);
  
  if (result) {
    // مسح الملفات بعد التسليم الناجح
    globalFileManager.clearFiles();
    if (window.currentFileUploadUI) {
      window.currentFileUploadUI.clearFiles();
    }
    
    alert('تم تسليم الواجب بنجاح!');
    return true;
  }
  
  return false;
}

// تصدير الوظائف
window.homeworkSystem = {
  getHomeworkByClassroom,
  getHomeworkByStudent,
  getHomeworkByTeacher,
  getSubmissionsByHomework,
  addHomework,
  submitHomework,
  submitHomeworkWithFiles,
  gradeSubmission,
  closeHomework,
  homeworkData,
  FileUploadManager,
  FileUploadUI,
  globalFileManager
};