// نظام الجدول الدراسي

// هيكل بيانات الجدول الدراسي (بيانات محاكاة)
const scheduleData = {
  // قائمة المواد الدراسية
  subjects: [
    { id: "sub1", name: "الرياضيات", code: "MATH101", color: "#3498db" },
    { id: "sub2", name: "العلوم", code: "SCI101", color: "#2ecc71" },
    { id: "sub3", name: "اللغة العربية", code: "ARB101", color: "#e74c3c" },
    { id: "sub4", name: "اللغة الإنجليزية", code: "ENG101", color: "#9b59b6" },
    { id: "sub5", name: "الدراسات الاجتماعية", code: "SOC101", color: "#f39c12" },
    { id: "sub6", name: "التربية الإسلامية", code: "ISL101", color: "#1abc9c" },
    { id: "sub7", name: "الحاسوب", code: "CS101", color: "#34495e" },
    { id: "sub8", name: "التربية الفنية", code: "ART101", color: "#d35400" },
    { id: "sub9", name: "التربية البدنية", code: "PE101", color: "#27ae60" }
  ],
  
  // قائمة الفصول الدراسية
  classrooms: [
    { id: "cls1", name: "الصف التاسع - أ", grade: "9", section: "أ", capacity: 30 },
    { id: "cls2", name: "الصف التاسع - ب", grade: "9", section: "ب", capacity: 28 },
    { id: "cls3", name: "الصف التاسع - ج", grade: "9", section: "ج", capacity: 25 },
    { id: "cls4", name: "الصف الثامن - أ", grade: "8", section: "أ", capacity: 30 },
    { id: "cls5", name: "الصف الثامن - ب", grade: "8", section: "ب", capacity: 32 }
  ],
  
  // قائمة القاعات الدراسية
  rooms: [
    { id: "room1", name: "قاعة 101", building: "المبنى الرئيسي", floor: "1", capacity: 35 },
    { id: "room2", name: "قاعة 102", building: "المبنى الرئيسي", floor: "1", capacity: 35 },
    { id: "room3", name: "قاعة 103", building: "المبنى الرئيسي", floor: "1", capacity: 30 },
    { id: "room4", name: "مختبر العلوم", building: "المبنى الرئيسي", floor: "2", capacity: 25 },
    { id: "room5", name: "مختبر الحاسوب", building: "المبنى الرئيسي", floor: "2", capacity: 25 },
    { id: "room6", name: "قاعة 201", building: "المبنى الرئيسي", floor: "2", capacity: 35 },
    { id: "room7", name: "قاعة الفنون", building: "المبنى الثانوي", floor: "1", capacity: 30 },
    { id: "room8", name: "الملعب", building: "خارجي", floor: "0", capacity: 60 }
  ],
  
  // أيام الأسبوع وفترات الحصص
  timeslots: [
    { id: "ts1", day: "الأحد", period: 1, startTime: "08:00", endTime: "08:45", name: "الحصة الأولى" },
    { id: "ts2", day: "الأحد", period: 2, startTime: "08:50", endTime: "09:35", name: "الحصة الثانية" },
    { id: "ts3", day: "الأحد", period: 3, startTime: "09:40", endTime: "10:25", name: "الحصة الثالثة" },
    { id: "ts4", day: "الأحد", period: 4, startTime: "10:40", endTime: "11:25", name: "الحصة الرابعة" },
    { id: "ts5", day: "الأحد", period: 5, startTime: "11:30", endTime: "12:15", name: "الحصة الخامسة" },
    { id: "ts6", day: "الأحد", period: 6, startTime: "12:20", endTime: "13:05", name: "الحصة السادسة" },
    { id: "ts7", day: "الاثنين", period: 1, startTime: "08:00", endTime: "08:45", name: "الحصة الأولى" },
    { id: "ts8", day: "الاثنين", period: 2, startTime: "08:50", endTime: "09:35", name: "الحصة الثانية" },
    { id: "ts9", day: "الاثنين", period: 3, startTime: "09:40", endTime: "10:25", name: "الحصة الثالثة" },
    { id: "ts10", day: "الاثنين", period: 4, startTime: "10:40", endTime: "11:25", name: "الحصة الرابعة" },
    { id: "ts11", day: "الاثنين", period: 5, startTime: "11:30", endTime: "12:15", name: "الحصة الخامسة" },
    { id: "ts12", day: "الاثنين", period: 6, startTime: "12:20", endTime: "13:05", name: "الحصة السادسة" },
    // الأيام المتبقية - ملاحظة: يمكن توليدها برمجياً لكافة أيام الأسبوع بنفس النمط
    { id: "ts13", day: "الثلاثاء", period: 1, startTime: "08:00", endTime: "08:45", name: "الحصة الأولى" },
    { id: "ts14", day: "الثلاثاء", period: 2, startTime: "08:50", endTime: "09:35", name: "الحصة الثانية" },
    // وهكذا...
    { id: "ts25", day: "الخميس", period: 1, startTime: "08:00", endTime: "08:45", name: "الحصة الأولى" },
    { id: "ts30", day: "الخميس", period: 6, startTime: "12:20", endTime: "13:05", name: "الحصة السادسة" }
  ],
  
  // جدول الحصص (توزيع المواد على الفصول والأوقات والقاعات)
  lessons: [
    {
      id: "l1", 
      subjectId: "sub1", // الرياضيات
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room1", // قاعة 101
      timeslotId: "ts1", // الأحد، الحصة الأولى
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    {
      id: "l2", 
      subjectId: "sub2", // العلوم
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room4", // مختبر العلوم
      timeslotId: "ts2", // الأحد، الحصة الثانية
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    {
      id: "l3", 
      subjectId: "sub3", // اللغة العربية
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room1", // قاعة 101
      timeslotId: "ts3", // الأحد، الحصة الثالثة
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    {
      id: "l4", 
      subjectId: "sub1", // الرياضيات
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room1", // قاعة 101
      timeslotId: "ts7", // الاثنين، الحصة الأولى
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    {
      id: "l5", 
      subjectId: "sub4", // اللغة الإنجليزية
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room1", // قاعة 101
      timeslotId: "ts8", // الاثنين، الحصة الثانية
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    {
      id: "l6", 
      subjectId: "sub7", // الحاسوب
      classroomId: "cls1", // الصف التاسع - أ
      teacherId: "2", // أحمد المعلم
      roomId: "room5", // مختبر الحاسوب
      timeslotId: "ts9", // الاثنين، الحصة الثالثة
      semester: "الفصل الأول",
      schoolYear: "2023-2024"
    },
    // المزيد من الحصص لبقية الأيام والفصول...
  ],
  
  // تغييرات الجدول (إلغاء أو تأجيل حصص)
  changes: [
    {
      id: "ch1",
      lessonId: "l1", // الحصة المتأثرة
      type: "cancel", // إلغاء
      date: "2024-05-20", // تاريخ التغيير
      reason: "غياب المعلم",
      createdBy: "1", // مدير النظام
      createdAt: "2024-05-19T08:30:00",
      notified: true // هل تم إرسال إشعار
    },
    {
      id: "ch2",
      lessonId: "l4", // الحصة المتأثرة
      type: "reschedule", // تغيير موعد
      date: "2024-05-21", // تاريخ التغيير
      newTimeslotId: "ts11", // الاثنين، الحصة الخامسة
      newRoomId: "room2", // قاعة 102
      reason: "صيانة القاعة",
      createdBy: "1", // مدير النظام
      createdAt: "2024-05-20T14:15:00",
      notified: true // هل تم إرسال إشعار
    }
  ]
};

// الحصول على جدول حصص الفصل الدراسي
function getClassroomSchedule(classroomId) {
  return scheduleData.lessons.filter(lesson => lesson.classroomId === classroomId)
    .map(lesson => {
      const subject = scheduleData.subjects.find(sub => sub.id === lesson.subjectId);
      const classroom = scheduleData.classrooms.find(cls => cls.id === lesson.classroomId);
      const teacher = users.find(user => user.id === lesson.teacherId);
      const room = scheduleData.rooms.find(r => r.id === lesson.roomId);
      const timeslot = scheduleData.timeslots.find(ts => ts.id === lesson.timeslotId);
      
      return {
        ...lesson,
        subject,
        classroom,
        teacher,
        room,
        timeslot
      };
    });
}

// الحصول على جدول حصص المعلم
function getTeacherSchedule(teacherId) {
  return scheduleData.lessons.filter(lesson => lesson.teacherId === teacherId)
    .map(lesson => {
      const subject = scheduleData.subjects.find(sub => sub.id === lesson.subjectId);
      const classroom = scheduleData.classrooms.find(cls => cls.id === lesson.classroomId);
      const room = scheduleData.rooms.find(r => r.id === lesson.roomId);
      const timeslot = scheduleData.timeslots.find(ts => ts.id === lesson.timeslotId);
      
      return {
        ...lesson,
        subject,
        classroom,
        room,
        timeslot
      };
    });
}

// الحصول على جدول حصص قاعة دراسية
function getRoomSchedule(roomId) {
  return scheduleData.lessons.filter(lesson => lesson.roomId === roomId)
    .map(lesson => {
      const subject = scheduleData.subjects.find(sub => sub.id === lesson.subjectId);
      const classroom = scheduleData.classrooms.find(cls => cls.id === lesson.classroomId);
      const teacher = users.find(user => user.id === lesson.teacherId);
      const timeslot = scheduleData.timeslots.find(ts => ts.id === lesson.timeslotId);
      
      return {
        ...lesson,
        subject,
        classroom,
        teacher,
        timeslot
      };
    });
}

// الحصول على جدول حصص الطالب (نفترض أن الطالب في فصل معين)
function getStudentSchedule(studentId) {
  // البحث عن الفصل الدراسي للطالب (نفترض أنه الصف التاسع أ)
  const classroomId = "cls1";
  return getClassroomSchedule(classroomId);
}

// إضافة حصة جديدة إلى الجدول
function addLesson(subjectId, classroomId, teacherId, roomId, timeslotId, semester, schoolYear) {
  // التحقق من عدم وجود تعارض في جدول المعلم أو القاعة أو الفصل
  const hasTeacherConflict = scheduleData.lessons.some(lesson => 
    lesson.teacherId === teacherId && lesson.timeslotId === timeslotId
  );
  
  const hasRoomConflict = scheduleData.lessons.some(lesson => 
    lesson.roomId === roomId && lesson.timeslotId === timeslotId
  );
  
  const hasClassroomConflict = scheduleData.lessons.some(lesson => 
    lesson.classroomId === classroomId && lesson.timeslotId === timeslotId
  );
  
  if (hasTeacherConflict) {
    return { success: false, message: "يوجد تعارض في جدول المعلم" };
  }
  
  if (hasRoomConflict) {
    return { success: false, message: "القاعة مشغولة في هذا الوقت" };
  }
  
  if (hasClassroomConflict) {
    return { success: false, message: "يوجد تعارض في جدول الفصل" };
  }
  
  const id = "l" + (scheduleData.lessons.length + 1);
  const newLesson = {
    id,
    subjectId,
    classroomId,
    teacherId,
    roomId,
    timeslotId,
    semester,
    schoolYear
  };
  
  scheduleData.lessons.push(newLesson);
  return { success: true, lesson: newLesson };
}

// تعديل حصة موجودة
function updateLesson(lessonId, updates) {
  const lessonIndex = scheduleData.lessons.findIndex(lesson => lesson.id === lessonId);
  
  if (lessonIndex === -1) {
    return { success: false, message: "الحصة غير موجودة" };
  }
  
  // التحقق من عدم وجود تعارضات إذا تم تغيير الوقت أو المعلم أو القاعة أو الفصل
  if (updates.timeslotId || updates.teacherId || updates.roomId || updates.classroomId) {
    const timeslotId = updates.timeslotId || scheduleData.lessons[lessonIndex].timeslotId;
    const teacherId = updates.teacherId || scheduleData.lessons[lessonIndex].teacherId;
    const roomId = updates.roomId || scheduleData.lessons[lessonIndex].roomId;
    const classroomId = updates.classroomId || scheduleData.lessons[lessonIndex].classroomId;
    
    // التحقق من التعارضات مع الحصص الأخرى (باستثناء الحصة الحالية)
    const hasTeacherConflict = scheduleData.lessons.some(lesson => 
      lesson.id !== lessonId && 
      lesson.teacherId === teacherId && 
      lesson.timeslotId === timeslotId
    );
    
    const hasRoomConflict = scheduleData.lessons.some(lesson => 
      lesson.id !== lessonId && 
      lesson.roomId === roomId && 
      lesson.timeslotId === timeslotId
    );
    
    const hasClassroomConflict = scheduleData.lessons.some(lesson => 
      lesson.id !== lessonId && 
      lesson.classroomId === classroomId && 
      lesson.timeslotId === timeslotId
    );
    
    if (hasTeacherConflict) {
      return { success: false, message: "يوجد تعارض في جدول المعلم" };
    }
    
    if (hasRoomConflict) {
      return { success: false, message: "القاعة مشغولة في هذا الوقت" };
    }
    
    if (hasClassroomConflict) {
      return { success: false, message: "يوجد تعارض في جدول الفصل" };
    }
  }
  
  // تحديث الحصة
  scheduleData.lessons[lessonIndex] = {
    ...scheduleData.lessons[lessonIndex],
    ...updates
  };
  
  return { success: true, lesson: scheduleData.lessons[lessonIndex] };
}

// إضافة تغيير على الجدول (إلغاء أو تأجيل)
function addScheduleChange(lessonId, type, date, reason, createdBy, newTimeslotId = null, newRoomId = null) {
  const lesson = scheduleData.lessons.find(lesson => lesson.id === lessonId);
  
  if (!lesson) {
    return { success: false, message: "الحصة غير موجودة" };
  }
  
  const id = "ch" + (scheduleData.changes.length + 1);
  const createdAt = new Date().toISOString();
  
  const newChange = {
    id,
    lessonId,
    type,
    date,
    reason,
    createdBy,
    createdAt,
    notified: false
  };
  
  if (type === "reschedule") {
    newChange.newTimeslotId = newTimeslotId;
    newChange.newRoomId = newRoomId;
    
    // التحقق من عدم وجود تعارضات مع الموعد الجديد
    const timeslot = scheduleData.timeslots.find(ts => ts.id === newTimeslotId);
    if (!timeslot) {
      return { success: false, message: "الوقت الجديد غير صالح" };
    }
    
    // التحقق من عدم وجود تعارض في القاعة الجديدة (إذا تم تغييرها)
    if (newRoomId) {
      const room = scheduleData.rooms.find(r => r.id === newRoomId);
      if (!room) {
        return { success: false, message: "القاعة الجديدة غير صالحة" };
      }
    }
  }
  
  scheduleData.changes.push(newChange);
  
  // في تطبيق حقيقي، سيتم إرسال إشعارات للمتأثرين بالتغيير هنا
  
  return { success: true, change: newChange };
}

// الحصول على تغييرات الجدول ليوم معين
function getScheduleChangesForDate(date) {
  return scheduleData.changes.filter(change => change.date === date)
    .map(change => {
      const lesson = scheduleData.lessons.find(l => l.id === change.lessonId);
      const subject = scheduleData.subjects.find(sub => sub.id === lesson.subjectId);
      const classroom = scheduleData.classrooms.find(cls => cls.id === lesson.classroomId);
      const teacher = users.find(user => user.id === lesson.teacherId);
      const room = scheduleData.rooms.find(r => r.id === lesson.roomId);
      const timeslot = scheduleData.timeslots.find(ts => ts.id === lesson.timeslotId);
      
      // إضافة معلومات الوقت والقاعة الجديدة في حالة إعادة الجدولة
      let newTimeslot = null;
      let newRoom = null;
      
      if (change.type === "reschedule") {
        newTimeslot = scheduleData.timeslots.find(ts => ts.id === change.newTimeslotId);
        newRoom = change.newRoomId ? scheduleData.rooms.find(r => r.id === change.newRoomId) : room;
      }
      
      return {
        ...change,
        lesson,
        subject,
        classroom,
        teacher,
        room,
        timeslot,
        newTimeslot,
        newRoom
      };
    });
}

// تصدير الوظائف
window.scheduleSystem = {
  getClassroomSchedule,
  getTeacherSchedule,
  getRoomSchedule,
  getStudentSchedule,
  addLesson,
  updateLesson,
  addScheduleChange,
  getScheduleChangesForDate,
  scheduleData
};