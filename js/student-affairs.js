// نظام شؤون الطلاب

// هيكل بيانات نظام شؤون الطلاب (بيانات محاكاة)
const studentAffairsData = {
  // ملفات الطلاب
  studentProfiles: [
    {
      id: "sp1",
      studentId: "3", // محمد الطالب
      personalInfo: {
        fullName: "محمد أحمد علي",
        dateOfBirth: "2010-05-15",
        gender: "ذكر",
        nationality: "سعودي",
        nationalId: "1234567890",
        address: "الرياض، حي النخيل، شارع الأمير محمد",
        contactPhone: "0501234567",
        email: "mohammed@example.com",
        bloodType: "A+",
        emergencyContact: {
          name: "أحمد علي (الأب)",
          relation: "أب",
          phone: "0551234567"
        },
        photo: "student_photos/mohammed.jpg",
        healthInfo: {
          chronicDiseases: "لا يوجد",
          allergies: "حساسية من الغبار",
          medications: "لا يوجد",
          specialNeeds: "لا يوجد",
          insuranceInfo: "شركة التأمين الصحي - رقم البوليصة: 987654"
        }
      },
      academicInfo: {
        enrollmentDate: "2022-09-01",
        currentGrade: "9",
        currentClassroom: "cls1", // الصف التاسع - أ
        previousSchool: "مدرسة النور الابتدائية",
        guardianId: "4", // خالد ولي الأمر
        status: "active", // نشط
        studentNumber: "20220103",
        achievements: [
          {
            id: "ach1",
            title: "المركز الأول في مسابقة الرياضيات",
            date: "2023-11-20",
            type: "academic", // أكاديمي
            description: "حصل على المركز الأول في مسابقة الرياضيات على مستوى المدرسة",
            issuer: "المدرسة"
          },
          {
            id: "ach2",
            title: "شهادة تميز في العلوم",
            date: "2023-12-15",
            type: "academic", // أكاديمي
            description: "حصل على شهادة تميز لإنجازه المميز في مشروع العلوم",
            issuer: "إدارة التعليم"
          }
        ],
        activities: [
          {
            id: "act1",
            name: "نادي العلوم",
            startDate: "2023-09-15",
            endDate: "2024-05-30",
            type: "club", // نادي
            description: "عضو في نادي العلوم المدرسي",
            role: "عضو"
          },
          {
            id: "act2",
            name: "فريق كرة القدم",
            startDate: "2023-10-01",
            endDate: "2024-04-30",
            type: "sports", // رياضي
            description: "لاعب في فريق كرة القدم المدرسي",
            role: "لاعب"
          }
        ]
      }
    }
  ],
  
  // سجلات الحضور
  attendance: [
    {
      id: "att1",
      date: "2024-05-15",
      classroomId: "cls1", // الصف التاسع - أ
      records: [
        {
          studentId: "3", // محمد الطالب
          status: "present", // حاضر
          timeIn: "07:45",
          timeOut: "14:10",
          notes: ""
        },
        // المزيد من سجلات الطلاب...
      ],
      recordedBy: "2", // أحمد المعلم
      recordedAt: "2024-05-15T08:00:00"
    }
  ],
  
  // سجلات الغياب
  absenceRecords: [
    {
      id: "abs1",
      studentId: "3", // محمد الطالب
      date: "2024-05-10",
      type: "excused", // مبرر
      reason: "زيارة طبية",
      document: "medical_certificates/mohammed_20240510.pdf",
      notes: "تم تقديم تقرير طبي",
      approvedBy: "1", // مدير النظام
      approvedAt: "2024-05-11T09:30:00",
      notifiedGuardian: true,
      notificationMethod: "email",
      notificationTimestamp: "2024-05-10T10:15:00"
    }
  ],
  
  // ملاحظات السلوك
  behaviorNotes: [
    {
      id: "beh1",
      studentId: "3", // محمد الطالب
      date: "2024-04-25",
      type: "positive", // إيجابي
      category: "cooperation", // تعاون
      description: "ساعد زملاءه في شرح درس الرياضيات",
      points: 5,
      recordedBy: "2", // أحمد المعلم
      recordedAt: "2024-04-25T12:30:00",
      notifiedGuardian: true,
      notificationTimestamp: "2024-04-25T14:00:00"
    },
    {
      id: "beh2",
      studentId: "3", // محمد الطالب
      date: "2024-05-05",
      type: "negative", // سلبي
      category: "classroom_disruption", // إزعاج الفصل
      description: "تحدث بصوت مرتفع أثناء الحصة",
      points: -2,
      recordedBy: "2", // أحمد المعلم
      recordedAt: "2024-05-05T10:15:00",
      notifiedGuardian: true,
      notificationTimestamp: "2024-05-05T14:00:00"
    }
  ],
  
  // سجلات الصحة
  healthRecords: [
    {
      id: "health1",
      studentId: "3", // محمد الطالب
      date: "2024-05-08",
      type: "sickness", // مرض
      description: "شعر بالدوار والصداع أثناء حصة الرياضة",
      action: "تم الاتصال بولي الأمر وأخذه إلى المنزل",
      recordedBy: "5", // الممرضة
      recordedAt: "2024-05-08T11:30:00",
      notifiedGuardian: true,
      notificationTimestamp: "2024-05-08T11:35:00"
    }
  ],
  
  // سجلات الزيارات المدرسية
  schoolVisits: [
    {
      id: "visit1",
      date: "2024-05-12",
      guardianId: "4", // خالد ولي الأمر
      studentId: "3", // محمد الطالب
      purpose: "مناقشة التقدم الأكاديمي",
      startTime: "13:00",
      endTime: "13:30",
      notes: "تمت مناقشة أداء الطالب في مادة الرياضيات والعلوم",
      metWith: "2", // أحمد المعلم
      recordedBy: "1" // مدير النظام
    }
  ],
  
  // معلومات النقل المدرسي
  transportation: [
    {
      id: "trans1",
      studentId: "3", // محمد الطالب
      routeId: "route1",
      pickupLocation: "الرياض، حي النخيل، شارع الأمير محمد، منزل رقم 45",
      pickupTime: "06:30",
      dropoffTime: "14:30",
      busNumber: "B123",
      driverName: "سعيد محمد",
      driverPhone: "0551234567",
      supervisorName: "ماجد خالد",
      supervisorPhone: "0561234567",
      status: "active", // نشط
      startDate: "2023-09-01",
      endDate: null,
      notes: ""
    }
  ],
  
  // خطوط سير النقل
  transportationRoutes: [
    {
      id: "route1",
      name: "المسار الشمالي",
      busNumber: "B123",
      driverName: "سعيد محمد",
      driverPhone: "0551234567",
      supervisorName: "ماجد خالد",
      supervisorPhone: "0561234567",
      startTime: "06:00",
      endTime: "07:30",
      returnStartTime: "14:15",
      returnEndTime: "15:45",
      stops: [
        {
          id: "stop1",
          name: "حي النخيل - 1",
          time: "06:30",
          returnTime: "14:45",
          location: "حي النخيل، تقاطع شارع الأمير محمد مع شارع الملك فهد",
          coordinates: {
            lat: 24.774265,
            lng: 46.738586
          }
        },
        {
          id: "stop2",
          name: "حي النخيل - 2",
          time: "06:40",
          returnTime: "14:55",
          location: "حي النخيل، أمام مسجد النور",
          coordinates: {
            lat: 24.781234,
            lng: 46.748765
          }
        },
        // المزيد من المحطات...
      ]
    }
  ]
};

// الحصول على ملف طالب محدد
function getStudentProfile(studentId) {
  const profile = studentAffairsData.studentProfiles.find(p => p.studentId === studentId);
  
  if (!profile) {
    return null;
  }
  
  // إضافة معلومات الفصل الدراسي
  const classroom = scheduleData.classrooms.find(cls => cls.id === profile.academicInfo.currentClassroom);
  
  // إضافة معلومات ولي الأمر
  const guardian = users.find(user => user.id === profile.academicInfo.guardianId);
  
  return {
    ...profile,
    classroom,
    guardian
  };
}

// إنشاء ملف طالب جديد
function createStudentProfile(profileData) {
  const id = "sp" + (studentAffairsData.studentProfiles.length + 1);
  
  const newProfile = {
    id,
    ...profileData
  };
  
  studentAffairsData.studentProfiles.push(newProfile);
  
  return newProfile;
}

// تحديث ملف طالب موجود
function updateStudentProfile(studentId, updates) {
  const profileIndex = studentAffairsData.studentProfiles.findIndex(p => p.studentId === studentId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const updatedProfile = {
    ...studentAffairsData.studentProfiles[profileIndex],
    ...updates
  };
  
  // تحديث المعلومات الشخصية إذا تم توفيرها
  if (updates.personalInfo) {
    updatedProfile.personalInfo = {
      ...updatedProfile.personalInfo,
      ...updates.personalInfo
    };
    
    // تحديث معلومات الصحة إذا تم توفيرها
    if (updates.personalInfo.healthInfo) {
      updatedProfile.personalInfo.healthInfo = {
        ...updatedProfile.personalInfo.healthInfo,
        ...updates.personalInfo.healthInfo
      };
    }
    
    // تحديث معلومات الاتصال في حالات الطوارئ إذا تم توفيرها
    if (updates.personalInfo.emergencyContact) {
      updatedProfile.personalInfo.emergencyContact = {
        ...updatedProfile.personalInfo.emergencyContact,
        ...updates.personalInfo.emergencyContact
      };
    }
  }
  
  // تحديث المعلومات الأكاديمية إذا تم توفيرها
  if (updates.academicInfo) {
    updatedProfile.academicInfo = {
      ...updatedProfile.academicInfo,
      ...updates.academicInfo
    };
  }
  
  studentAffairsData.studentProfiles[profileIndex] = updatedProfile;
  
  return updatedProfile;
}

// إضافة إنجاز جديد للطالب
function addStudentAchievement(studentId, achievementData) {
  const profileIndex = studentAffairsData.studentProfiles.findIndex(p => p.studentId === studentId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const id = "ach" + (studentAffairsData.studentProfiles[profileIndex].academicInfo.achievements.length + 1);
  
  const newAchievement = {
    id,
    ...achievementData
  };
  
  studentAffairsData.studentProfiles[profileIndex].academicInfo.achievements.push(newAchievement);
  
  return newAchievement;
}

// إضافة نشاط جديد للطالب
function addStudentActivity(studentId, activityData) {
  const profileIndex = studentAffairsData.studentProfiles.findIndex(p => p.studentId === studentId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const id = "act" + (studentAffairsData.studentProfiles[profileIndex].academicInfo.activities.length + 1);
  
  const newActivity = {
    id,
    ...activityData
  };
  
  studentAffairsData.studentProfiles[profileIndex].academicInfo.activities.push(newActivity);
  
  return newActivity;
}

// تسجيل الحضور اليومي لفصل دراسي
function recordClassAttendance(classroomId, date, records, teacherId) {
  // التحقق من وجود سجل حضور لهذا الفصل في هذا اليوم
  const existingAttendanceIndex = studentAffairsData.attendance.findIndex(att => 
    att.classroomId === classroomId && att.date === date
  );
  
  const now = new Date().toISOString();
  
  if (existingAttendanceIndex !== -1) {
    // تحديث سجل الحضور الموجود
    studentAffairsData.attendance[existingAttendanceIndex].records = records;
    studentAffairsData.attendance[existingAttendanceIndex].recordedBy = teacherId;
    studentAffairsData.attendance[existingAttendanceIndex].recordedAt = now;
    
    return studentAffairsData.attendance[existingAttendanceIndex];
  } else {
    // إنشاء سجل حضور جديد
    const id = "att" + (studentAffairsData.attendance.length + 1);
    
    const newAttendance = {
      id,
      date,
      classroomId,
      records,
      recordedBy: teacherId,
      recordedAt: now
    };
    
    studentAffairsData.attendance.push(newAttendance);
    
    // إضافة سجلات الغياب تلقائياً
    records.forEach(record => {
      if (record.status === "absent") {
        addAbsenceRecord({
          studentId: record.studentId,
          date,
          type: "unexcused", // غير مبرر
          reason: "غياب عن المدرسة",
          notes: "",
          notifiedGuardian: true,
          notificationMethod: "sms"
        }, teacherId);
      }
    });
    
    return newAttendance;
  }
}

// الحصول على سجلات الحضور لفصل دراسي في فترة زمنية محددة
function getClassAttendance(classroomId, startDate, endDate) {
  const filteredAttendance = studentAffairsData.attendance.filter(att => 
    att.classroomId === classroomId &&
    att.date >= startDate &&
    att.date <= endDate
  );
  
  return filteredAttendance.map(att => {
    const classroom = scheduleData.classrooms.find(cls => cls.id === att.classroomId);
    const teacher = users.find(user => user.id === att.recordedBy);
    
    // حساب إحصائيات الحضور
    const totalStudents = att.records.length;
    const presentCount = att.records.filter(rec => rec.status === "present").length;
    const absentCount = att.records.filter(rec => rec.status === "absent").length;
    const lateCount = att.records.filter(rec => rec.status === "late").length;
    const excusedCount = att.records.filter(rec => rec.status === "excused").length;
    
    return {
      ...att,
      classroom,
      teacher,
      stats: {
        totalStudents,
        presentCount,
        absentCount,
        lateCount,
        excusedCount,
        attendanceRate: Math.round((presentCount / totalStudents) * 100)
      }
    };
  });
}

// الحصول على سجلات الحضور لطالب محدد في فترة زمنية محددة
function getStudentAttendance(studentId, startDate, endDate) {
  // الحصول على الفصل الدراسي للطالب
  const profile = studentAffairsData.studentProfiles.find(p => p.studentId === studentId);
  
  if (!profile) {
    return [];
  }
  
  const classroomId = profile.academicInfo.currentClassroom;
  
  // الحصول على سجلات الحضور للفصل الدراسي
  const classAttendance = studentAffairsData.attendance.filter(att => 
    att.classroomId === classroomId &&
    att.date >= startDate &&
    att.date <= endDate
  );
  
  // استخراج سجلات الطالب
  return classAttendance.map(att => {
    const studentRecord = att.records.find(rec => rec.studentId === studentId);
    
    return {
      date: att.date,
      status: studentRecord ? studentRecord.status : "unknown",
      timeIn: studentRecord ? studentRecord.timeIn : null,
      timeOut: studentRecord ? studentRecord.timeOut : null,
      notes: studentRecord ? studentRecord.notes : ""
    };
  });
}

// إضافة سجل غياب لطالب
function addAbsenceRecord(absenceData, teacherId) {
  const id = "abs" + (studentAffairsData.absenceRecords.length + 1);
  const now = new Date().toISOString();
  
  const newAbsenceRecord = {
    id,
    ...absenceData,
    approvedBy: teacherId,
    approvedAt: now,
    notificationTimestamp: now
  };
  
  studentAffairsData.absenceRecords.push(newAbsenceRecord);
  
  return newAbsenceRecord;
}

// الحصول على سجلات الغياب لطالب محدد في فترة زمنية محددة
function getStudentAbsenceRecords(studentId, startDate, endDate) {
  return studentAffairsData.absenceRecords.filter(rec => 
    rec.studentId === studentId &&
    rec.date >= startDate &&
    rec.date <= endDate
  ).map(rec => {
    const approver = users.find(user => user.id === rec.approvedBy);
    
    return {
      ...rec,
      approverName: approver?.name
    };
  });
}

// إضافة ملاحظة سلوكية لطالب
function addBehaviorNote(behaviorData, teacherId) {
  const id = "beh" + (studentAffairsData.behaviorNotes.length + 1);
  const now = new Date().toISOString();
  
  const newBehaviorNote = {
    id,
    ...behaviorData,
    recordedBy: teacherId,
    recordedAt: now,
    notifiedGuardian: true,
    notificationTimestamp: now
  };
  
  studentAffairsData.behaviorNotes.push(newBehaviorNote);
  
  return newBehaviorNote;
}

// الحصول على ملاحظات السلوك لطالب محدد في فترة زمنية محددة
function getStudentBehaviorNotes(studentId, startDate, endDate) {
  return studentAffairsData.behaviorNotes.filter(note => 
    note.studentId === studentId &&
    note.date >= startDate &&
    note.date <= endDate
  ).map(note => {
    const recorder = users.find(user => user.id === note.recordedBy);
    
    return {
      ...note,
      recorderName: recorder?.name
    };
  });
}

// إضافة سجل صحي لطالب
function addHealthRecord(healthData, staffId) {
  const id = "health" + (studentAffairsData.healthRecords.length + 1);
  const now = new Date().toISOString();
  
  const newHealthRecord = {
    id,
    ...healthData,
    recordedBy: staffId,
    recordedAt: now,
    notifiedGuardian: true,
    notificationTimestamp: now
  };
  
  studentAffairsData.healthRecords.push(newHealthRecord);
  
  return newHealthRecord;
}

// الحصول على السجلات الصحية لطالب محدد في فترة زمنية محددة
function getStudentHealthRecords(studentId, startDate, endDate) {
  return studentAffairsData.healthRecords.filter(rec => 
    rec.studentId === studentId &&
    rec.date >= startDate &&
    rec.date <= endDate
  ).map(rec => {
    const recorder = users.find(user => user.id === rec.recordedBy);
    
    return {
      ...rec,
      recorderName: recorder?.name
    };
  });
}

// إضافة سجل زيارة مدرسية
function addSchoolVisit(visitData, staffId) {
  const id = "visit" + (studentAffairsData.schoolVisits.length + 1);
  
  const newVisit = {
    id,
    ...visitData,
    recordedBy: staffId
  };
  
  studentAffairsData.schoolVisits.push(newVisit);
  
  return newVisit;
}

// الحصول على سجلات الزيارات المدرسية لطالب محدد
function getStudentSchoolVisits(studentId) {
  return studentAffairsData.schoolVisits.filter(visit => 
    visit.studentId === studentId
  ).map(visit => {
    const guardian = users.find(user => user.id === visit.guardianId);
    const meetWith = users.find(user => user.id === visit.metWith);
    const recorder = users.find(user => user.id === visit.recordedBy);
    
    return {
      ...visit,
      guardianName: guardian?.name,
      meetWithName: meetWith?.name,
      recorderName: recorder?.name
    };
  });
}

// الحصول على معلومات النقل المدرسي لطالب محدد
function getStudentTransportation(studentId) {
  const transportInfo = studentAffairsData.transportation.find(trans => 
    trans.studentId === studentId && trans.status === "active"
  );
  
  if (!transportInfo) {
    return null;
  }
  
  const route = studentAffairsData.transportationRoutes.find(route => 
    route.id === transportInfo.routeId
  );
  
  return {
    ...transportInfo,
    route
  };
}

// تحديث معلومات النقل المدرسي لطالب
function updateStudentTransportation(studentId, transportationData) {
  const transportIndex = studentAffairsData.transportation.findIndex(trans => 
    trans.studentId === studentId && trans.status === "active"
  );
  
  if (transportIndex !== -1) {
    // تحديث معلومات النقل الحالية
    studentAffairsData.transportation[transportIndex] = {
      ...studentAffairsData.transportation[transportIndex],
      ...transportationData
    };
    
    return studentAffairsData.transportation[transportIndex];
  } else {
    // إنشاء معلومات نقل جديدة
    const id = "trans" + (studentAffairsData.transportation.length + 1);
    
    const newTransportation = {
      id,
      studentId,
      ...transportationData,
      status: "active",
      startDate: new Date().toISOString().split('T')[0],
      endDate: null
    };
    
    studentAffairsData.transportation.push(newTransportation);
    
    return newTransportation;
  }
}

// الحصول على إحصائيات شاملة لطالب محدد
function getStudentStatistics(studentId, schoolYear) {
  const profile = getStudentProfile(studentId);
  
  if (!profile) {
    return null;
  }
  
  // حساب نسبة الحضور
  const attendanceStats = calculateAttendanceStats(studentId, schoolYear);
  
  // حساب نقاط السلوك
  const behaviorStats = calculateBehaviorPoints(studentId, schoolYear);
  
  // الحصول على المعدل الأكاديمي
  const academicStats = calculateAcademicPerformance(studentId, schoolYear);
  
  // عدد الإنجازات
  const achievementsCount = profile.academicInfo.achievements.length;
  
  // عدد الأنشطة
  const activitiesCount = profile.academicInfo.activities.length;
  
  return {
    studentId,
    studentName: profile.personalInfo.fullName,
    grade: profile.academicInfo.currentGrade,
    classroom: profile.classroom?.name,
    schoolYear,
    attendance: attendanceStats,
    behavior: behaviorStats,
    academic: academicStats,
    achievements: achievementsCount,
    activities: activitiesCount
  };
}

// حساب إحصائيات الحضور
function calculateAttendanceStats(studentId, schoolYear) {
  // تحديد الفترة الزمنية للعام الدراسي (مثال)
  const startDate = schoolYear.split("-")[0] + "-09-01"; // 1 سبتمبر
  const endDate = schoolYear.split("-")[1] + "-06-30"; // 30 يونيو
  
  // الحصول على سجلات الحضور
  const attendanceRecords = getStudentAttendance(studentId, startDate, endDate);
  
  // حساب الإحصائيات
  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(rec => rec.status === "present").length;
  const absentDays = attendanceRecords.filter(rec => rec.status === "absent").length;
  const lateDays = attendanceRecords.filter(rec => rec.status === "late").length;
  const excusedDays = attendanceRecords.filter(rec => rec.status === "excused").length;
  
  return {
    totalDays,
    presentDays,
    absentDays,
    lateDays,
    excusedDays,
    attendanceRate: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
  };
}

// حساب نقاط السلوك
function calculateBehaviorPoints(studentId, schoolYear) {
  // تحديد الفترة الزمنية للعام الدراسي
  const startDate = schoolYear.split("-")[0] + "-09-01"; // 1 سبتمبر
  const endDate = schoolYear.split("-")[1] + "-06-30"; // 30 يونيو
  
  // الحصول على ملاحظات السلوك
  const behaviorNotes = getStudentBehaviorNotes(studentId, startDate, endDate);
  
  // حساب النقاط
  const positiveNotes = behaviorNotes.filter(note => note.type === "positive");
  const negativeNotes = behaviorNotes.filter(note => note.type === "negative");
  
  const positivePoints = positiveNotes.reduce((sum, note) => sum + note.points, 0);
  const negativePoints = negativeNotes.reduce((sum, note) => sum + note.points, 0);
  const totalPoints = positivePoints + negativePoints;
  
  return {
    positiveNotesCount: positiveNotes.length,
    negativeNotesCount: negativeNotes.length,
    totalNotesCount: behaviorNotes.length,
    positivePoints,
    negativePoints,
    totalPoints
  };
}

// حساب الأداء الأكاديمي
function calculateAcademicPerformance(studentId, schoolYear) {
  // الحصول على النتائج الأكاديمية من نظام الاختبارات
  const transcript = examData.transcripts.find(tr => 
    tr.studentId === studentId && 
    tr.schoolYear === schoolYear
  );
  
  if (!transcript) {
    return {
      gpa: 0,
      averageGrade: 0,
      subjects: []
    };
  }
  
  // حساب متوسط الدرجات
  const totalGrades = transcript.grades.reduce((sum, grade) => sum + grade.finalGrade, 0);
  const averageGrade = transcript.grades.length > 0 ? totalGrades / transcript.grades.length : 0;
  
  // تحضير معلومات المواد
  const subjects = transcript.grades.map(grade => {
    const subject = scheduleData.subjects.find(sub => sub.id === grade.subjectId);
    
    return {
      subjectId: grade.subjectId,
      subjectName: subject?.name,
      finalGrade: grade.finalGrade,
      letterGrade: grade.letterGrade
    };
  });
  
  return {
    gpa: transcript.gpa,
    averageGrade,
    subjects
  };
}

// تصدير الوظائف
window.studentAffairsSystem = {
  getStudentProfile,
  createStudentProfile,
  updateStudentProfile,
  addStudentAchievement,
  addStudentActivity,
  recordClassAttendance,
  getClassAttendance,
  getStudentAttendance,
  addAbsenceRecord,
  getStudentAbsenceRecords,
  addBehaviorNote,
  getStudentBehaviorNotes,
  addHealthRecord,
  getStudentHealthRecords,
  addSchoolVisit,
  getStudentSchoolVisits,
  getStudentTransportation,
  updateStudentTransportation,
  getStudentStatistics,
  studentAffairsData
};