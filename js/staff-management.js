// نظام شؤون الموظفين وإدارة المعلمين

// هيكل بيانات نظام شؤون الموظفين (بيانات محاكاة)
const staffData = {
  // ملفات الموظفين
  staffProfiles: [
    {
      id: "sp1",
      employeeId: "2", // أحمد المعلم
      personalInfo: {
        fullName: "أحمد محمد السيد",
        dateOfBirth: "1985-05-20",
        gender: "ذكر",
        nationality: "سعودي",
        nationalId: "1085123456",
        address: "الرياض، حي الورود، شارع العليا",
        contactPhone: "0561234567",
        email: "ahmed@example.com",
        emergencyContact: {
          name: "محمد السيد (الأخ)",
          relation: "أخ",
          phone: "0571234567"
        },
        photo: "staff_photos/ahmed.jpg",
        maritalStatus: "متزوج",
        children: 2
      },
      employmentInfo: {
        position: "معلم رياضيات",
        department: "القسم العلمي",
        employmentType: "دوام كامل", // دوام كامل
        joiningDate: "2020-08-15",
        contractType: "سنوي", // سنوي
        contractStartDate: "2023-08-15",
        contractEndDate: "2024-07-31",
        previousRenewals: 3,
        employmentStatus: "active", // نشط
        workSchedule: "Sunday-Thursday, 7:00-15:00",
        supervisor: "1", // مدير النظام
        yearsOfExperience: 8,
        initialSalary: 7500,
        currentSalary: 8000,
        bankAccount: {
          bankName: "البنك الأهلي",
          accountNumber: "SA1234567890",
          iban: "SA1234567890123456789012"
        }
      },
      educationInfo: {
        degrees: [
          {
            id: "deg1",
            degree: "بكالوريوس",
            major: "رياضيات",
            university: "جامعة الملك سعود",
            country: "السعودية",
            year: "2007"
          },
          {
            id: "deg2",
            degree: "ماجستير",
            major: "طرق تدريس الرياضيات",
            university: "جامعة الملك سعود",
            country: "السعودية",
            year: "2012"
          }
        ],
        certifications: [
          {
            id: "cert1",
            name: "دورة استراتيجيات التدريس الحديثة",
            issuer: "وزارة التعليم",
            date: "2019-06-15",
            expiryDate: "2024-06-15",
            description: "دورة تدريبية في استراتيجيات التدريس الحديثة"
          },
          {
            id: "cert2",
            name: "دورة التعليم الإلكتروني",
            issuer: "مركز التطوير المهني",
            date: "2021-01-10",
            expiryDate: null,
            description: "دورة تدريبية في استخدام التقنيات الحديثة في التعليم"
          }
        ]
      },
      teachingInfo: {
        subjects: ["sub1"], // الرياضيات
        grades: ["9"], // الصف التاسع
        classrooms: ["cls1", "cls2", "cls3"], // الصف التاسع - أ، ب، ج
        weeklySessions: 20,
        specialization: "رياضيات",
        teachingMethodology: "تفاعلي"
      }
    }
  ],
  
  // سجلات الحضور
  attendance: [
    {
      id: "att1",
      employeeId: "2", // أحمد المعلم
      date: "2023-09-10",
      checkIn: "07:05",
      checkOut: "15:10",
      status: "present", // حاضر
      late: true,
      lateMinutes: 5,
      overTime: 10,
      notes: "تأخر 5 دقائق في الحضور"
    },
    {
      id: "att2",
      employeeId: "2", // أحمد المعلم
      date: "2023-09-11",
      checkIn: "06:55",
      checkOut: "15:00",
      status: "present", // حاضر
      late: false,
      lateMinutes: 0,
      overTime: 0,
      notes: ""
    }
  ],
  
  // الإجازات
  leaves: [
    {
      id: "leave1",
      employeeId: "2", // أحمد المعلم
      type: "sick", // مرضية
      startDate: "2023-09-20",
      endDate: "2023-09-21",
      duration: 2, // يومان
      reason: "ظروف صحية",
      document: "leave_documents/sick_leave_20230920.pdf",
      status: "approved", // موافق عليها
      approvedBy: "1", // مدير النظام
      approvedAt: "2023-09-19T10:00:00",
      notes: ""
    }
  ],
  
  // سجلات تقييم الأداء
  performanceReviews: [
    {
      id: "perf1",
      employeeId: "2", // أحمد المعلم
      reviewPeriod: "الفصل الدراسي الأول",
      schoolYear: "2023-2024",
      reviewDate: "2023-12-15",
      reviewer: "1", // مدير النظام
      categories: [
        {
          id: "cat1",
          name: "التدريس",
          criteria: [
            {
              id: "crit1",
              name: "خطط الدروس",
              score: 9,
              maxScore: 10,
              comments: "خطط دروس منظمة ومعدة بشكل جيد"
            },
            {
              id: "crit2",
              name: "توصيل المعلومات",
              score: 8,
              maxScore: 10,
              comments: "قدرة جيدة على توصيل المعلومات للطلاب"
            },
            {
              id: "crit3",
              name: "استراتيجيات التدريس",
              score: 9,
              maxScore: 10,
              comments: "استخدام متنوع لاستراتيجيات التدريس"
            }
          ],
          totalScore: 26,
          maxScore: 30,
          percentage: 86.67
        },
        {
          id: "cat2",
          name: "إدارة الصف",
          criteria: [
            {
              id: "crit4",
              name: "ضبط الصف",
              score: 8,
              maxScore: 10,
              comments: "قدرة جيدة على ضبط الصف"
            },
            {
              id: "crit5",
              name: "التفاعل مع الطلاب",
              score: 9,
              maxScore: 10,
              comments: "تفاعل إيجابي مع الطلاب"
            }
          ],
          totalScore: 17,
          maxScore: 20,
          percentage: 85
        },
        {
          id: "cat3",
          name: "التعاون والالتزام",
          criteria: [
            {
              id: "crit6",
              name: "التعاون مع الزملاء",
              score: 9,
              maxScore: 10,
              comments: "تعاون ممتاز مع الزملاء"
            },
            {
              id: "crit7",
              name: "الالتزام بمواعيد العمل",
              score: 8,
              maxScore: 10,
              comments: "التزام جيد بمواعيد العمل مع بعض التأخير"
            }
          ],
          totalScore: 17,
          maxScore: 20,
          percentage: 85
        }
      ],
      totalScore: 60,
      maxScore: 70,
      overallPercentage: 85.71,
      rating: "ممتاز",
      strengths: "قدرة ممتازة على شرح المفاهيم الصعبة. تفاعل إيجابي مع الطلاب. إعداد جيد للدروس.",
      areasForImprovement: "الحضور في الوقت المحدد. زيادة استخدام التقنية في التدريس.",
      goalsForNextPeriod: "حضور دورة تدريبية في استخدام التقنية في تدريس الرياضيات. تطوير مواد تعليمية إضافية.",
      employeeComments: "أشكر إدارة المدرسة على الدعم المستمر. سأعمل على تحسين نقاط الضعف.",
      status: "completed" // مكتمل
    }
  ],
  
  // برامج التطوير المهني
  professionalDevelopment: [
    {
      id: "pd1",
      name: "استراتيجيات التدريس الحديثة",
      description: "دورة تدريبية في استراتيجيات التدريس الحديثة وتطبيقاتها",
      type: "training", // تدريب
      provider: "مركز التطوير المهني",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      duration: 20, // ساعة
      location: "مقر المدرسة",
      status: "scheduled", // مجدول
      attendees: [
        {
          employeeId: "2", // أحمد المعلم
          registrationDate: "2023-09-25",
          status: "registered", // مسجل
          attendance: null, // لم يبدأ بعد
          completionStatus: null, // لم يبدأ بعد
          certificate: null // لم يبدأ بعد
        }
      ],
      cost: 1500,
      currency: "ريال",
      materials: [
        {
          id: "mat1",
          name: "دليل المتدرب",
          type: "pdf",
          url: "training_materials/training_guide.pdf"
        }
      ]
    }
  ],
  
  // الجدول التدريسي للمعلمين
  teachingSchedules: [
    {
      id: "ts1",
      employeeId: "2", // أحمد المعلم
      schoolYear: "2023-2024",
      semester: "الفصل الأول",
      schedule: [
        {
          id: "sch1",
          day: "الأحد",
          periods: [
            {
              id: "p1",
              periodNumber: 1,
              subject: "sub1", // الرياضيات
              classroom: "cls1", // الصف التاسع - أ
              time: "07:30-08:15",
              recurrent: true,
              location: "room101"
            },
            {
              id: "p2",
              periodNumber: 2,
              subject: "sub1", // الرياضيات
              classroom: "cls2", // الصف التاسع - ب
              time: "08:20-09:05",
              recurrent: true,
              location: "room102"
            },
            {
              id: "p3",
              periodNumber: 3,
              subject: null,
              classroom: null,
              time: "09:10-09:55",
              recurrent: true,
              location: "office",
              activity: "إعداد"
            },
            {
              id: "p4",
              periodNumber: 4,
              subject: "sub1", // الرياضيات
              classroom: "cls3", // الصف التاسع - ج
              time: "10:00-10:45",
              recurrent: true,
              location: "room103"
            }
          ]
        },
        {
          id: "sch2",
          day: "الاثنين",
          periods: [
            {
              id: "p5",
              periodNumber: 1,
              subject: "sub1", // الرياضيات
              classroom: "cls3", // الصف التاسع - ج
              time: "07:30-08:15",
              recurrent: true,
              location: "room103"
            },
            {
              id: "p6",
              periodNumber: 2,
              subject: "sub1", // الرياضيات
              classroom: "cls1", // الصف التاسع - أ
              time: "08:20-09:05",
              recurrent: true,
              location: "room101"
            },
            {
              id: "p7",
              periodNumber: 3,
              subject: "sub1", // الرياضيات
              classroom: "cls2", // الصف التاسع - ب
              time: "09:10-09:55",
              recurrent: true,
              location: "room102"
            },
            {
              id: "p8",
              periodNumber: 4,
              subject: null,
              classroom: null,
              time: "10:00-10:45",
              recurrent: true,
              location: "office",
              activity: "إعداد"
            }
          ]
        }
      ],
      totalTeachingHours: 20,
      otherResponsibilities: [
        {
          id: "resp1",
          name: "ريادة فصل",
          description: "ريادة الصف التاسع - أ",
          classroom: "cls1", // الصف التاسع - أ
          hoursPerWeek: 2
        },
        {
          id: "resp2",
          name: "إشراف على نادي",
          description: "الإشراف على نادي الرياضيات",
          hoursPerWeek: 3
        }
      ]
    }
  ],
  
  // طلبات الموظفين
  staffRequests: [
    {
      id: "req1",
      employeeId: "2", // أحمد المعلم
      type: "document", // طلب وثيقة
      requestDate: "2023-09-18",
      description: "طلب شهادة خبرة",
      status: "approved", // موافق عليه
      approvedBy: "1", // مدير النظام
      approvedAt: "2023-09-19T09:00:00",
      notes: ""
    },
    {
      id: "req2",
      employeeId: "2", // أحمد المعلم
      type: "schedule_change", // تغيير في الجدول
      requestDate: "2023-09-25",
      description: "طلب تبديل حصة الرياضيات للصف التاسع - أ من يوم الأحد إلى يوم الثلاثاء",
      status: "pending", // قيد الانتظار
      notes: ""
    }
  ],
  
  // الإنجازات والجوائز
  achievements: [
    {
      id: "ach1",
      employeeId: "2", // أحمد المعلم
      title: "معلم الشهر",
      date: "2023-09-30",
      category: "teaching", // تدريس
      description: "تم اختياره كمعلم الشهر لشهر سبتمبر 2023",
      issuer: "إدارة المدرسة",
      document: "achievements/teacher_of_month_sep2023.pdf"
    }
  ],
  
  // الملاحظات والتوصيات
  observations: [
    {
      id: "obs1",
      employeeId: "2", // أحمد المعلم
      observerId: "1", // مدير النظام
      date: "2023-09-15",
      classroomId: "cls1", // الصف التاسع - أ
      subjectId: "sub1", // الرياضيات
      duration: 45, // دقيقة
      focus: "طرق التدريس",
      notes: "قدم المعلم الدرس بطريقة منظمة وتفاعلية. استخدم وسائل تعليمية متنوعة.",
      strengths: "قدرة ممتازة على شرح المفاهيم الصعبة. تفاعل جيد مع الطلاب.",
      areasForImprovement: "زيادة مشاركة الطلاب الأقل تفاعلاً. زيادة استخدام التقنية.",
      recommendations: "حضور دورة تدريبية في استخدام التقنية في تدريس الرياضيات.",
      followUp: "سيتم متابعة تطبيق التوصيات في الزيارة القادمة.",
      status: "completed" // مكتمل
    }
  ]
};

// الحصول على ملف موظف معين
function getStaffProfile(employeeId) {
  const profile = staffData.staffProfiles.find(p => p.employeeId === employeeId);
  
  if (!profile) {
    return null;
  }
  
  // إضافة معلومات إضافية
  const supervisor = users.find(user => user.id === profile.employmentInfo.supervisor);
  
  return {
    ...profile,
    supervisorName: supervisor?.name
  };
}

// إنشاء ملف موظف جديد
function createStaffProfile(profileData) {
  const id = "sp" + (staffData.staffProfiles.length + 1);
  
  const newProfile = {
    id,
    ...profileData
  };
  
  staffData.staffProfiles.push(newProfile);
  
  return newProfile;
}

// تحديث ملف موظف موجود
function updateStaffProfile(employeeId, updates) {
  const profileIndex = staffData.staffProfiles.findIndex(p => p.employeeId === employeeId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const updatedProfile = {
    ...staffData.staffProfiles[profileIndex]
  };
  
  // تحديث المعلومات الشخصية إذا تم توفيرها
  if (updates.personalInfo) {
    updatedProfile.personalInfo = {
      ...updatedProfile.personalInfo,
      ...updates.personalInfo
    };
    
    // تحديث معلومات الاتصال في حالات الطوارئ إذا تم توفيرها
    if (updates.personalInfo.emergencyContact) {
      updatedProfile.personalInfo.emergencyContact = {
        ...updatedProfile.personalInfo.emergencyContact,
        ...updates.personalInfo.emergencyContact
      };
    }
  }
  
  // تحديث معلومات التوظيف إذا تم توفيرها
  if (updates.employmentInfo) {
    updatedProfile.employmentInfo = {
      ...updatedProfile.employmentInfo,
      ...updates.employmentInfo
    };
    
    // تحديث معلومات الحساب البنكي إذا تم توفيرها
    if (updates.employmentInfo.bankAccount) {
      updatedProfile.employmentInfo.bankAccount = {
        ...updatedProfile.employmentInfo.bankAccount,
        ...updates.employmentInfo.bankAccount
      };
    }
  }
  
  // تحديث معلومات التعليم إذا تم توفيرها
  if (updates.educationInfo) {
    updatedProfile.educationInfo = {
      ...updatedProfile.educationInfo,
      ...updates.educationInfo
    };
  }
  
  // تحديث معلومات التدريس إذا تم توفيرها
  if (updates.teachingInfo) {
    updatedProfile.teachingInfo = {
      ...updatedProfile.teachingInfo,
      ...updates.teachingInfo
    };
  }
  
  staffData.staffProfiles[profileIndex] = updatedProfile;
  
  return updatedProfile;
}

// إضافة شهادة علمية جديدة
function addDegree(employeeId, degreeData) {
  const profileIndex = staffData.staffProfiles.findIndex(p => p.employeeId === employeeId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const id = "deg" + (staffData.staffProfiles[profileIndex].educationInfo.degrees.length + 1);
  
  const newDegree = {
    id,
    ...degreeData
  };
  
  staffData.staffProfiles[profileIndex].educationInfo.degrees.push(newDegree);
  
  return newDegree;
}

// إضافة شهادة مهنية جديدة
function addCertification(employeeId, certificationData) {
  const profileIndex = staffData.staffProfiles.findIndex(p => p.employeeId === employeeId);
  
  if (profileIndex === -1) {
    return null;
  }
  
  const id = "cert" + (staffData.staffProfiles[profileIndex].educationInfo.certifications.length + 1);
  
  const newCertification = {
    id,
    ...certificationData
  };
  
  staffData.staffProfiles[profileIndex].educationInfo.certifications.push(newCertification);
  
  return newCertification;
}

// تسجيل حضور موظف
function recordAttendance(attendanceData) {
  const id = "att" + (staffData.attendance.length + 1);
  
  // حساب التأخير (إذا وجد)
  let late = false;
  let lateMinutes = 0;
  
  if (attendanceData.checkIn) {
    const checkInTime = attendanceData.checkIn.split(':').map(Number);
    const expectedTime = "07:00".split(':').map(Number);
    
    // التأخير بالدقائق
    const checkInMinutes = checkInTime[0] * 60 + checkInTime[1];
    const expectedMinutes = expectedTime[0] * 60 + expectedTime[1];
    
    if (checkInMinutes > expectedMinutes) {
      late = true;
      lateMinutes = checkInMinutes - expectedMinutes;
    }
  }
  
  // حساب الوقت الإضافي (إذا وجد)
  let overTime = 0;
  
  if (attendanceData.checkOut) {
    const checkOutTime = attendanceData.checkOut.split(':').map(Number);
    const expectedTime = "15:00".split(':').map(Number);
    
    // الوقت الإضافي بالدقائق
    const checkOutMinutes = checkOutTime[0] * 60 + checkOutTime[1];
    const expectedMinutes = expectedTime[0] * 60 + expectedTime[1];
    
    if (checkOutMinutes > expectedMinutes) {
      overTime = checkOutMinutes - expectedMinutes;
    }
  }
  
  const newAttendance = {
    id,
    late,
    lateMinutes,
    overTime,
    ...attendanceData
  };
  
  staffData.attendance.push(newAttendance);
  
  return newAttendance;
}

// الحصول على سجل حضور موظف في فترة زمنية محددة
function getEmployeeAttendance(employeeId, startDate, endDate) {
  return staffData.attendance.filter(att => 
    att.employeeId === employeeId &&
    att.date >= startDate &&
    att.date <= endDate
  );
}

// إحصائيات الحضور لموظف معين
function getAttendanceStats(employeeId, startDate, endDate) {
  const attendanceRecords = getEmployeeAttendance(employeeId, startDate, endDate);
  
  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(att => att.status === "present").length;
  const absentDays = attendanceRecords.filter(att => att.status === "absent").length;
  const lateDays = attendanceRecords.filter(att => att.late).length;
  
  const totalLateMinutes = attendanceRecords.reduce((sum, att) => sum + (att.lateMinutes || 0), 0);
  const totalOverTime = attendanceRecords.reduce((sum, att) => sum + (att.overTime || 0), 0);
  
  return {
    totalDays,
    presentDays,
    absentDays,
    lateDays,
    attendanceRate: totalDays > 0 ? (presentDays / totalDays) * 100 : 0,
    totalLateMinutes,
    totalOverTime,
    avgLateMinutes: lateDays > 0 ? totalLateMinutes / lateDays : 0,
    avgOverTime: presentDays > 0 ? totalOverTime / presentDays : 0
  };
}

// تقديم طلب إجازة
function requestLeave(leaveData) {
  const id = "leave" + (staffData.leaves.length + 1);
  
  // حساب مدة الإجازة
  const startDate = new Date(leaveData.startDate);
  const endDate = new Date(leaveData.endDate);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 لشمول يوم البداية والنهاية
  
  const newLeave = {
    id,
    duration: diffDays,
    status: "pending", // قيد الانتظار
    ...leaveData
  };
  
  staffData.leaves.push(newLeave);
  
  return newLeave;
}

// الموافقة على طلب إجازة
function approveLeave(leaveId, approverId, notes = "") {
  const leaveIndex = staffData.leaves.findIndex(leave => leave.id === leaveId);
  
  if (leaveIndex === -1) {
    return null;
  }
  
  staffData.leaves[leaveIndex] = {
    ...staffData.leaves[leaveIndex],
    status: "approved", // موافق عليها
    approvedBy: approverId,
    approvedAt: new Date().toISOString(),
    notes
  };
  
  return staffData.leaves[leaveIndex];
}

// رفض طلب إجازة
function rejectLeave(leaveId, approverId, notes = "") {
  const leaveIndex = staffData.leaves.findIndex(leave => leave.id === leaveId);
  
  if (leaveIndex === -1) {
    return null;
  }
  
  staffData.leaves[leaveIndex] = {
    ...staffData.leaves[leaveIndex],
    status: "rejected", // مرفوضة
    approvedBy: approverId,
    approvedAt: new Date().toISOString(),
    notes
  };
  
  return staffData.leaves[leaveIndex];
}

// الحصول على إجازات موظف معين
function getEmployeeLeaves(employeeId, status = null) {
  return staffData.leaves.filter(leave => 
    leave.employeeId === employeeId &&
    (status ? leave.status === status : true)
  );
}

// إنشاء تقييم أداء
function createPerformanceReview(reviewData) {
  const id = "perf" + (staffData.performanceReviews.length + 1);
  
  // حساب الدرجة الإجمالية
  let totalScore = 0;
  let maxScore = 0;
  
  reviewData.categories.forEach(category => {
    category.totalScore = category.criteria.reduce((sum, crit) => sum + crit.score, 0);
    category.maxScore = category.criteria.reduce((sum, crit) => sum + crit.maxScore, 0);
    category.percentage = (category.totalScore / category.maxScore) * 100;
    
    totalScore += category.totalScore;
    maxScore += category.maxScore;
  });
  
  const overallPercentage = (totalScore / maxScore) * 100;
  
  // تحديد التقدير
  let rating = "";
  if (overallPercentage >= 90) {
    rating = "ممتاز";
  } else if (overallPercentage >= 80) {
    rating = "جيد جداً";
  } else if (overallPercentage >= 70) {
    rating = "جيد";
  } else if (overallPercentage >= 60) {
    rating = "مقبول";
  } else {
    rating = "ضعيف";
  }
  
  const newReview = {
    id,
    totalScore,
    maxScore,
    overallPercentage,
    rating,
    status: "completed", // مكتمل
    ...reviewData
  };
  
  staffData.performanceReviews.push(newReview);
  
  return newReview;
}

// الحصول على تقييمات أداء موظف معين
function getEmployeePerformanceReviews(employeeId, schoolYear = null) {
  return staffData.performanceReviews.filter(review => 
    review.employeeId === employeeId &&
    (schoolYear ? review.schoolYear === schoolYear : true)
  ).map(review => {
    const employee = users.find(user => user.id === review.employeeId);
    const reviewer = users.find(user => user.id === review.reviewer);
    
    return {
      ...review,
      employeeName: employee?.name,
      reviewerName: reviewer?.name
    };
  });
}

// إضافة برنامج تطوير مهني
function addProfessionalDevelopment(programData) {
  const id = "pd" + (staffData.professionalDevelopment.length + 1);
  
  const newProgram = {
    id,
    ...programData
  };
  
  staffData.professionalDevelopment.push(newProgram);
  
  return newProgram;
}

// تسجيل موظف في برنامج تطوير مهني
function registerForDevelopment(programId, employeeId) {
  const programIndex = staffData.professionalDevelopment.findIndex(prog => prog.id === programId);
  
  if (programIndex === -1) {
    return { success: false, message: "البرنامج غير موجود" };
  }
  
  // التحقق مما إذا كان الموظف مسجلاً بالفعل
  const isRegistered = staffData.professionalDevelopment[programIndex].attendees.some(att => 
    att.employeeId === employeeId
  );
  
  if (isRegistered) {
    return { success: false, message: "الموظف مسجل بالفعل" };
  }
  
  const newAttendee = {
    employeeId,
    registrationDate: new Date().toISOString().split('T')[0],
    status: "registered", // مسجل
    attendance: null, // لم يبدأ بعد
    completionStatus: null, // لم يبدأ بعد
    certificate: null // لم يبدأ بعد
  };
  
  staffData.professionalDevelopment[programIndex].attendees.push(newAttendee);
  
  return { success: true, program: staffData.professionalDevelopment[programIndex] };
}

// الحصول على برامج التطوير المهني لموظف معين
function getEmployeeDevelopmentPrograms(employeeId) {
  return staffData.professionalDevelopment.filter(prog => 
    prog.attendees.some(att => att.employeeId === employeeId)
  ).map(program => {
    const attendee = program.attendees.find(att => att.employeeId === employeeId);
    
    return {
      ...program,
      registrationDate: attendee?.registrationDate,
      status: attendee?.status,
      attendance: attendee?.attendance,
      completionStatus: attendee?.completionStatus,
      certificate: attendee?.certificate
    };
  });
}

// الحصول على الجدول التدريسي لمعلم معين
function getTeacherSchedule(employeeId, schoolYear, semester) {
  const schedule = staffData.teachingSchedules.find(sch => 
    sch.employeeId === employeeId &&
    sch.schoolYear === schoolYear &&
    sch.semester === semester
  );
  
  if (!schedule) {
    return null;
  }
  
  const teacher = users.find(user => user.id === employeeId);
  
  // إضافة معلومات إضافية للحصص
  const enhancedSchedule = {
    ...schedule,
    teacherName: teacher?.name,
    schedule: schedule.schedule.map(day => {
      return {
        ...day,
        periods: day.periods.map(period => {
          const subject = period.subject ? scheduleData.subjects.find(sub => sub.id === period.subject) : null;
          const classroom = period.classroom ? scheduleData.classrooms.find(cls => cls.id === period.classroom) : null;
          
          return {
            ...period,
            subjectName: subject?.name,
            classroomName: classroom?.name
          };
        })
      };
    })
  };
  
  return enhancedSchedule;
}

// إنشاء جدول تدريسي لمعلم
function createTeacherSchedule(scheduleData) {
  const id = "ts" + (staffData.teachingSchedules.length + 1);
  
  const newSchedule = {
    id,
    ...scheduleData
  };
  
  staffData.teachingSchedules.push(newSchedule);
  
  return newSchedule;
}

// تقديم طلب موظف
function submitStaffRequest(requestData) {
  const id = "req" + (staffData.staffRequests.length + 1);
  
  const newRequest = {
    id,
    requestDate: new Date().toISOString().split('T')[0],
    status: "pending", // قيد الانتظار
    ...requestData
  };
  
  staffData.staffRequests.push(newRequest);
  
  return newRequest;
}

// الموافقة على طلب موظف
function approveStaffRequest(requestId, approverId, notes = "") {
  const requestIndex = staffData.staffRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) {
    return null;
  }
  
  staffData.staffRequests[requestIndex] = {
    ...staffData.staffRequests[requestIndex],
    status: "approved", // موافق عليه
    approvedBy: approverId,
    approvedAt: new Date().toISOString(),
    notes
  };
  
  return staffData.staffRequests[requestIndex];
}

// رفض طلب موظف
function rejectStaffRequest(requestId, approverId, notes = "") {
  const requestIndex = staffData.staffRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) {
    return null;
  }
  
  staffData.staffRequests[requestIndex] = {
    ...staffData.staffRequests[requestIndex],
    status: "rejected", // مرفوض
    approvedBy: approverId,
    approvedAt: new Date().toISOString(),
    notes
  };
  
  return staffData.staffRequests[requestIndex];
}

// الحصول على طلبات موظف معين
function getEmployeeRequests(employeeId, status = null) {
  return staffData.staffRequests.filter(req => 
    req.employeeId === employeeId &&
    (status ? req.status === status : true)
  ).map(request => {
    const employee = users.find(user => user.id === request.employeeId);
    const approver = users.find(user => user.id === request.approvedBy);
    
    return {
      ...request,
      employeeName: employee?.name,
      approverName: approver?.name
    };
  });
}

// إضافة إنجاز للموظف
function addEmployeeAchievement(achievementData) {
  const id = "ach" + (staffData.achievements.length + 1);
  
  const newAchievement = {
    id,
    ...achievementData
  };
  
  staffData.achievements.push(newAchievement);
  
  return newAchievement;
}

// الحصول على إنجازات موظف معين
function getEmployeeAchievements(employeeId) {
  return staffData.achievements.filter(ach => ach.employeeId === employeeId).map(achievement => {
    const employee = users.find(user => user.id === achievement.employeeId);
    
    return {
      ...achievement,
      employeeName: employee?.name
    };
  });
}

// إضافة ملاحظة للموظف
function addEmployeeObservation(observationData) {
  const id = "obs" + (staffData.observations.length + 1);
  
  const newObservation = {
    id,
    ...observationData
  };
  
  staffData.observations.push(newObservation);
  
  return newObservation;
}

// الحصول على ملاحظات موظف معين
function getEmployeeObservations(employeeId) {
  return staffData.observations.filter(obs => obs.employeeId === employeeId).map(observation => {
    const employee = users.find(user => user.id === observation.employeeId);
    const observer = users.find(user => user.id === observation.observerId);
    const classroom = scheduleData.classrooms.find(cls => cls.id === observation.classroomId);
    const subject = scheduleData.subjects.find(sub => sub.id === observation.subjectId);
    
    return {
      ...observation,
      employeeName: employee?.name,
      observerName: observer?.name,
      classroomName: classroom?.name,
      subjectName: subject?.name
    };
  });
}

// الحصول على إحصائيات موظف شاملة
function getEmployeeStatistics(employeeId, schoolYear) {
  const profile = getStaffProfile(employeeId);
  
  if (!profile) {
    return null;
  }
  
  // تحديد الفترة الزمنية للعام الدراسي (مثال)
  const startDate = schoolYear.split("-")[0] + "-09-01"; // 1 سبتمبر
  const endDate = schoolYear.split("-")[1] + "-06-30"; // 30 يونيو
  
  // إحصائيات الحضور
  const attendanceStats = getAttendanceStats(employeeId, startDate, endDate);
  
  // تقييمات الأداء
  const performanceReviews = getEmployeePerformanceReviews(employeeId, schoolYear);
  
  // الإجازات
  const leaves = getEmployeeLeaves(employeeId);
  const totalLeaveDays = leaves.reduce((sum, leave) => sum + leave.duration, 0);
  
  // الإنجازات
  const achievements = getEmployeeAchievements(employeeId);
  
  // برامج التطوير المهني
  const developmentPrograms = getEmployeeDevelopmentPrograms(employeeId);
  
  return {
    employeeId,
    employeeName: profile.personalInfo.fullName,
    position: profile.employmentInfo.position,
    department: profile.employmentInfo.department,
    schoolYear,
    attendance: attendanceStats,
    performance: {
      reviewsCount: performanceReviews.length,
      averageRating: performanceReviews.length > 0 ? 
        performanceReviews.reduce((sum, rev) => sum + rev.overallPercentage, 0) / performanceReviews.length : 0,
      lastReview: performanceReviews.length > 0 ? performanceReviews[0] : null
    },
    leaves: {
      totalRequests: leaves.length,
      approvedRequests: leaves.filter(leave => leave.status === "approved").length,
      totalDays: totalLeaveDays
    },
    achievements: {
      count: achievements.length,
      categories: achievements.reduce((acc, ach) => {
        const category = ach.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category]++;
        return acc;
      }, {})
    },
    development: {
      programsCount: developmentPrograms.length,
      completedPrograms: developmentPrograms.filter(prog => prog.completionStatus === "completed").length,
      totalHours: developmentPrograms.reduce((sum, prog) => sum + prog.duration, 0)
    }
  };
}

// تصدير الوظائف
window.staffManagement = {
  getStaffProfile,
  createStaffProfile,
  updateStaffProfile,
  addDegree,
  addCertification,
  recordAttendance,
  getEmployeeAttendance,
  getAttendanceStats,
  requestLeave,
  approveLeave,
  rejectLeave,
  getEmployeeLeaves,
  createPerformanceReview,
  getEmployeePerformanceReviews,
  addProfessionalDevelopment,
  registerForDevelopment,
  getEmployeeDevelopmentPrograms,
  getTeacherSchedule,
  createTeacherSchedule,
  submitStaffRequest,
  approveStaffRequest,
  rejectStaffRequest,
  getEmployeeRequests,
  addEmployeeAchievement,
  getEmployeeAchievements,
  addEmployeeObservation,
  getEmployeeObservations,
  getEmployeeStatistics,
  staffData
};