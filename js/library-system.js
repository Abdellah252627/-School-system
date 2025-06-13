// نظام مكتبة المصادر التعليمية

// هيكل بيانات المكتبة (بيانات محاكاة)
const libraryData = {
  // أنواع المصادر
  resourceTypes: [
    { id: "type1", name: "مذكرة", icon: "file-alt" },
    { id: "type2", name: "عرض تقديمي", icon: "file-powerpoint" },
    { id: "type3", name: "اختبار سابق", icon: "file-contract" },
    { id: "type4", name: "ورقة عمل", icon: "file-invoice" },
    { id: "type5", name: "فيديو تعليمي", icon: "film" },
    { id: "type6", name: "رابط خارجي", icon: "link" },
    { id: "type7", name: "كتاب إلكتروني", icon: "book" },
    { id: "type8", name: "مقال", icon: "newspaper" },
    { id: "type9", name: "تطبيق", icon: "mobile-alt" }
  ],
  
  // تصنيفات المصادر
  categories: [
    { 
      id: "cat1", 
      name: "الرياضيات",
      subcategories: [
        { id: "subcat1", name: "الجبر" },
        { id: "subcat2", name: "الهندسة" },
        { id: "subcat3", name: "الإحصاء" },
        { id: "subcat4", name: "حساب المثلثات" },
        { id: "subcat5", name: "التفاضل والتكامل" }
      ]
    },
    { 
      id: "cat2", 
      name: "العلوم",
      subcategories: [
        { id: "subcat6", name: "الفيزياء" },
        { id: "subcat7", name: "الكيمياء" },
        { id: "subcat8", name: "الأحياء" },
        { id: "subcat9", name: "علوم الأرض" }
      ]
    },
    { 
      id: "cat3", 
      name: "اللغة العربية",
      subcategories: [
        { id: "subcat10", name: "النحو" },
        { id: "subcat11", name: "الصرف" },
        { id: "subcat12", name: "البلاغة" },
        { id: "subcat13", name: "الأدب" },
        { id: "subcat14", name: "النصوص" }
      ]
    },
    { 
      id: "cat4", 
      name: "اللغة الإنجليزية",
      subcategories: [
        { id: "subcat15", name: "القواعد" },
        { id: "subcat16", name: "المفردات" },
        { id: "subcat17", name: "الاستماع" },
        { id: "subcat18", name: "المحادثة" },
        { id: "subcat19", name: "الكتابة" }
      ]
    },
    { 
      id: "cat5", 
      name: "الدراسات الاجتماعية",
      subcategories: [
        { id: "subcat20", name: "التاريخ" },
        { id: "subcat21", name: "الجغرافيا" },
        { id: "subcat22", name: "التربية الوطنية" }
      ]
    }
  ],
  
  // المصادر التعليمية
  resources: [
    {
      id: "res1",
      title: "شرح الدوال الرياضية",
      description: "شرح مفصل للدوال الرياضية وأنواعها مع أمثلة متنوعة",
      categoryId: "cat1", // الرياضيات
      subcategoryId: "subcat1", // الجبر
      typeId: "type1", // مذكرة
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-03-15",
      updatedAt: "2024-03-15",
      fileUrl: "#",
      fileName: "شرح الدوال الرياضية.pdf",
      fileType: "application/pdf",
      fileSize: "2.5MB",
      grade: "9", // الصف التاسع
      views: 87,
      downloads: 42,
      isFeatured: true,
      tags: ["دوال", "رياضيات", "جبر"]
    },
    {
      id: "res2",
      title: "عرض تقديمي: الضوء والألوان",
      description: "عرض تقديمي شامل عن الضوء وانكساره وظاهرة الألوان",
      categoryId: "cat2", // العلوم
      subcategoryId: "subcat6", // الفيزياء
      typeId: "type2", // عرض تقديمي
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-04-10",
      updatedAt: "2024-04-12",
      fileUrl: "#",
      fileName: "الضوء والألوان.pptx",
      fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      fileSize: "4.8MB",
      grade: "9", // الصف التاسع
      views: 56,
      downloads: 31,
      isFeatured: false,
      tags: ["ضوء", "ألوان", "انكسار", "فيزياء"]
    },
    {
      id: "res3",
      title: "اختبار الفصل الأول - اللغة العربية",
      description: "نموذج اختبار الفصل الأول لمادة اللغة العربية للصف التاسع",
      categoryId: "cat3", // اللغة العربية
      subcategoryId: "subcat14", // النصوص
      typeId: "type3", // اختبار سابق
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
      fileUrl: "#",
      fileName: "اختبار اللغة العربية - الفصل الأول.pdf",
      fileType: "application/pdf",
      fileSize: "1.2MB",
      grade: "9", // الصف التاسع
      views: 128,
      downloads: 95,
      isFeatured: false,
      tags: ["اختبار", "لغة عربية", "الفصل الأول"]
    },
    {
      id: "res4",
      title: "فيديو شرح قواعد اللغة الإنجليزية - الأزمنة",
      description: "شرح مفصل بالفيديو لقواعد الأزمنة في اللغة الإنجليزية",
      categoryId: "cat4", // اللغة الإنجليزية
      subcategoryId: "subcat15", // القواعد
      typeId: "type5", // فيديو تعليمي
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-02-28",
      updatedAt: "2024-02-28",
      fileUrl: "https://www.youtube.com/watch?v=example",
      fileName: null,
      fileType: "video/mp4",
      fileSize: null,
      grade: "9", // الصف التاسع
      views: 214,
      downloads: 0,
      isFeatured: true,
      tags: ["لغة إنجليزية", "قواعد", "أزمنة", "فيديو"]
    },
    {
      id: "res5",
      title: "ورقة عمل: حل المعادلات",
      description: "ورقة عمل تدريبية لحل المعادلات الرياضية من الدرجة الأولى والثانية",
      categoryId: "cat1", // الرياضيات
      subcategoryId: "subcat1", // الجبر
      typeId: "type4", // ورقة عمل
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-05-02",
      updatedAt: "2024-05-02",
      fileUrl: "#",
      fileName: "ورقة عمل - حل المعادلات.pdf",
      fileType: "application/pdf",
      fileSize: "0.9MB",
      grade: "9", // الصف التاسع
      views: 45,
      downloads: 32,
      isFeatured: false,
      tags: ["رياضيات", "معادلات", "ورقة عمل", "جبر"]
    }
  ],
  
  // تعليقات المستخدمين على المصادر
  comments: [
    {
      id: "cmt1",
      resourceId: "res1", // شرح الدوال الرياضية
      userId: "3", // محمد الطالب
      content: "شرح ممتاز ومفيد جداً، ساعدني في فهم الدوال بشكل أفضل.",
      createdAt: "2024-03-20T14:30:00",
      isApproved: true
    },
    {
      id: "cmt2",
      resourceId: "res2", // عرض تقديمي: الضوء والألوان
      userId: "3", // محمد الطالب
      content: "العرض التقديمي رائع، لكن أتمنى لو كان هناك المزيد من الصور التوضيحية.",
      createdAt: "2024-04-15T10:45:00",
      isApproved: true
    },
    {
      id: "cmt3",
      resourceId: "res4", // فيديو شرح قواعد اللغة الإنجليزية
      userId: "4", // خالد ولي الأمر
      content: "فيديو مفيد جداً لابني، شكراً على هذا المحتوى المميز.",
      createdAt: "2024-03-10T16:20:00",
      isApproved: true
    }
  ],
  
  // تقييمات المستخدمين للمصادر
  ratings: [
    {
      id: "rat1",
      resourceId: "res1", // شرح الدوال الرياضية
      userId: "3", // محمد الطالب
      rating: 5, // من 5
      createdAt: "2024-03-20T14:35:00"
    },
    {
      id: "rat2",
      resourceId: "res2", // عرض تقديمي: الضوء والألوان
      userId: "3", // محمد الطالب
      rating: 4, // من 5
      createdAt: "2024-04-15T10:50:00"
    },
    {
      id: "rat3",
      resourceId: "res3", // اختبار الفصل الأول - اللغة العربية
      userId: "3", // محمد الطالب
      rating: 4, // من 5
      createdAt: "2024-01-25T09:15:00"
    },
    {
      id: "rat4",
      resourceId: "res4", // فيديو شرح قواعد اللغة الإنجليزية
      userId: "4", // خالد ولي الأمر
      rating: 5, // من 5
      createdAt: "2024-03-10T16:25:00"
    }
  ],
  
  // سجلات التنزيل
  downloadLogs: [
    {
      id: "dl1",
      resourceId: "res1", // شرح الدوال الرياضية
      userId: "3", // محمد الطالب
      downloadedAt: "2024-03-20T14:40:00",
      ipAddress: "192.168.1.100"
    },
    {
      id: "dl2",
      resourceId: "res2", // عرض تقديمي: الضوء والألوان
      userId: "3", // محمد الطالب
      downloadedAt: "2024-04-15T10:55:00",
      ipAddress: "192.168.1.100"
    }
  ]
};

// الحصول على جميع المصادر (مع خيارات التصفية)
function getResources(filters = {}) {
  let filteredResources = [...libraryData.resources];
  
  // تطبيق التصفية حسب الفئة
  if (filters.categoryId) {
    filteredResources = filteredResources.filter(res => res.categoryId === filters.categoryId);
  }
  
  // تطبيق التصفية حسب الفئة الفرعية
  if (filters.subcategoryId) {
    filteredResources = filteredResources.filter(res => res.subcategoryId === filters.subcategoryId);
  }
  
  // تطبيق التصفية حسب النوع
  if (filters.typeId) {
    filteredResources = filteredResources.filter(res => res.typeId === filters.typeId);
  }
  
  // تطبيق التصفية حسب الصف
  if (filters.grade) {
    filteredResources = filteredResources.filter(res => res.grade === filters.grade);
  }
  
  // تطبيق التصفية حسب المنشئ
  if (filters.createdBy) {
    filteredResources = filteredResources.filter(res => res.createdBy === filters.createdBy);
  }
  
  // تطبيق التصفية حسب الكلمات المفتاحية
  if (filters.keywords) {
    const keywords = filters.keywords.toLowerCase().split(' ');
    filteredResources = filteredResources.filter(res => {
      const textToSearch = `${res.title} ${res.description} ${res.tags.join(' ')}`.toLowerCase();
      return keywords.some(keyword => textToSearch.includes(keyword));
    });
  }
  
  // تطبيق الترتيب
  if (filters.sort) {
    switch (filters.sort) {
      case 'newest':
        filteredResources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredResources.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filteredResources.sort((a, b) => b.views - a.views);
        break;
      case 'downloads':
        filteredResources.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'title':
        filteredResources.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }
  
  // إضافة المعلومات المرتبطة
  return filteredResources.map(resource => {
    const category = libraryData.categories.find(cat => cat.id === resource.categoryId);
    const subcategory = category?.subcategories.find(subcat => subcat.id === resource.subcategoryId);
    const resourceType = libraryData.resourceTypes.find(type => type.id === resource.typeId);
    const createdByUser = users.find(user => user.id === resource.createdBy);
    
    // حساب متوسط التقييم
    const resourceRatings = libraryData.ratings.filter(rating => rating.resourceId === resource.id);
    const avgRating = resourceRatings.length > 0 ? 
      resourceRatings.reduce((sum, rating) => sum + rating.rating, 0) / resourceRatings.length : 
      0;
    
    return {
      ...resource,
      category: category?.name,
      subcategory: subcategory?.name,
      typeName: resourceType?.name,
      typeIcon: resourceType?.icon,
      createdByName: createdByUser?.name,
      commentsCount: libraryData.comments.filter(cmt => cmt.resourceId === resource.id && cmt.isApproved).length,
      avgRating,
      ratingsCount: resourceRatings.length
    };
  });
}

// الحصول على مصدر محدد بواسطة الهوية
function getResourceById(resourceId) {
  const resource = libraryData.resources.find(res => res.id === resourceId);
  
  if (!resource) {
    return null;
  }
  
  const category = libraryData.categories.find(cat => cat.id === resource.categoryId);
  const subcategory = category?.subcategories.find(subcat => subcat.id === resource.subcategoryId);
  const resourceType = libraryData.resourceTypes.find(type => type.id === resource.typeId);
  const createdByUser = users.find(user => user.id === resource.createdBy);
  
  // الحصول على التعليقات المعتمدة
  const comments = libraryData.comments
    .filter(cmt => cmt.resourceId === resourceId && cmt.isApproved)
    .map(comment => {
      const user = users.find(u => u.id === comment.userId);
      return {
        ...comment,
        userName: user?.name,
        userRole: user?.role
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // حساب متوسط التقييم
  const resourceRatings = libraryData.ratings.filter(rating => rating.resourceId === resourceId);
  const avgRating = resourceRatings.length > 0 ? 
    resourceRatings.reduce((sum, rating) => sum + rating.rating, 0) / resourceRatings.length : 
    0;
  
  return {
    ...resource,
    category: category?.name,
    subcategory: subcategory?.name,
    typeName: resourceType?.name,
    typeIcon: resourceType?.icon,
    createdByName: createdByUser?.name,
    comments,
    avgRating,
    ratingsCount: resourceRatings.length
  };
}

// الحصول على المصادر المميزة
function getFeaturedResources() {
  return getResources({ sort: 'newest' }).filter(res => res.isFeatured);
}

// الحصول على المصادر الأكثر شعبية
function getPopularResources(limit = 5) {
  return getResources({ sort: 'popular' }).slice(0, limit);
}

// الحصول على أحدث المصادر
function getLatestResources(limit = 5) {
  return getResources({ sort: 'newest' }).slice(0, limit);
}

// الحصول على مصادر مرتبطة بمصدر معين
function getRelatedResources(resourceId, limit = 3) {
  const resource = libraryData.resources.find(res => res.id === resourceId);
  
  if (!resource) {
    return [];
  }
  
  // البحث عن مصادر في نفس الفئة أو الفئة الفرعية أو لها نفس الكلمات المفتاحية
  return getResources()
    .filter(res => 
      res.id !== resourceId && 
      (res.categoryId === resource.categoryId || 
       res.subcategoryId === resource.subcategoryId ||
       res.tags.some(tag => resource.tags.includes(tag)))
    )
    .slice(0, limit);
}

// إضافة مصدر تعليمي جديد
function addResource(resourceData) {
  const id = "res" + (libraryData.resources.length + 1);
  const now = new Date().toISOString().split('T')[0];
  
  const newResource = {
    id,
    ...resourceData,
    createdAt: now,
    updatedAt: now,
    views: 0,
    downloads: 0,
    isFeatured: false
  };
  
  libraryData.resources.push(newResource);
  return getResourceById(id);
}

// تحديث مصدر تعليمي موجود
function updateResource(resourceId, updates) {
  const resourceIndex = libraryData.resources.findIndex(res => res.id === resourceId);
  
  if (resourceIndex === -1) {
    return null;
  }
  
  const now = new Date().toISOString().split('T')[0];
  
  libraryData.resources[resourceIndex] = {
    ...libraryData.resources[resourceIndex],
    ...updates,
    updatedAt: now
  };
  
  return getResourceById(resourceId);
}

// حذف مصدر تعليمي
function deleteResource(resourceId) {
  const resourceIndex = libraryData.resources.findIndex(res => res.id === resourceId);
  
  if (resourceIndex === -1) {
    return false;
  }
  
  // حذف المصدر
  libraryData.resources.splice(resourceIndex, 1);
  
  // حذف التعليقات المرتبطة
  libraryData.comments = libraryData.comments.filter(cmt => cmt.resourceId !== resourceId);
  
  // حذف التقييمات المرتبطة
  libraryData.ratings = libraryData.ratings.filter(rating => rating.resourceId !== resourceId);
  
  // حذف سجلات التنزيل المرتبطة
  libraryData.downloadLogs = libraryData.downloadLogs.filter(log => log.resourceId !== resourceId);
  
  return true;
}

// إضافة تعليق على مصدر
function addComment(resourceId, userId, content) {
  const resource = libraryData.resources.find(res => res.id === resourceId);
  
  if (!resource) {
    return null;
  }
  
  const id = "cmt" + (libraryData.comments.length + 1);
  const now = new Date().toISOString();
  
  const newComment = {
    id,
    resourceId,
    userId,
    content,
    createdAt: now,
    isApproved: false // بحاجة إلى موافقة المشرف
  };
  
  libraryData.comments.push(newComment);
  
  // في التطبيق الحقيقي، يتم إرسال إشعار للمشرف للموافقة على التعليق
  
  const user = users.find(u => u.id === userId);
  
  return {
    ...newComment,
    userName: user?.name,
    userRole: user?.role
  };
}

// تقييم مصدر
function rateResource(resourceId, userId, rating) {
  const resource = libraryData.resources.find(res => res.id === resourceId);
  
  if (!resource || rating < 1 || rating > 5) {
    return null;
  }
  
  // التحقق مما إذا كان المستخدم قد قيم المصدر من قبل
  const existingRatingIndex = libraryData.ratings.findIndex(
    r => r.resourceId === resourceId && r.userId === userId
  );
  
  const now = new Date().toISOString();
  
  if (existingRatingIndex !== -1) {
    // تحديث التقييم الموجود
    libraryData.ratings[existingRatingIndex].rating = rating;
    libraryData.ratings[existingRatingIndex].createdAt = now;
  } else {
    // إضافة تقييم جديد
    const id = "rat" + (libraryData.ratings.length + 1);
    
    const newRating = {
      id,
      resourceId,
      userId,
      rating,
      createdAt: now
    };
    
    libraryData.ratings.push(newRating);
  }
  
  // حساب متوسط التقييم الجديد
  const resourceRatings = libraryData.ratings.filter(r => r.resourceId === resourceId);
  const avgRating = resourceRatings.reduce((sum, r) => sum + r.rating, 0) / resourceRatings.length;
  
  return {
    resourceId,
    avgRating,
    ratingsCount: resourceRatings.length
  };
}

// تسجيل تنزيل مصدر
function logDownload(resourceId, userId, ipAddress) {
  const resource = libraryData.resources.find(res => res.id === resourceId);
  
  if (!resource) {
    return false;
  }
  
  // تسجيل التنزيل
  const id = "dl" + (libraryData.downloadLogs.length + 1);
  const now = new Date().toISOString();
  
  const newDownloadLog = {
    id,
    resourceId,
    userId,
    downloadedAt: now,
    ipAddress
  };
  
  libraryData.downloadLogs.push(newDownloadLog);
  
  // زيادة عداد التنزيلات
  const resourceIndex = libraryData.resources.findIndex(res => res.id === resourceId);
  libraryData.resources[resourceIndex].downloads += 1;
  
  return true;
}

// تسجيل مشاهدة مصدر
function logView(resourceId) {
  const resourceIndex = libraryData.resources.findIndex(res => res.id === resourceId);
  
  if (resourceIndex === -1) {
    return false;
  }
  
  // زيادة عداد المشاهدات
  libraryData.resources[resourceIndex].views += 1;
  
  return true;
}

// البحث في المصادر
function searchResources(query, filters = {}) {
  if (!query || query.trim() === '') {
    return getResources(filters);
  }
  
  // تطبيق البحث النصي
  filters.keywords = query;
  return getResources(filters);
}

// تصدير الوظائف
window.librarySystem = {
  getResources,
  getResourceById,
  getFeaturedResources,
  getPopularResources,
  getLatestResources,
  getRelatedResources,
  addResource,
  updateResource,
  deleteResource,
  addComment,
  rateResource,
  logDownload,
  logView,
  searchResources,
  libraryData
};