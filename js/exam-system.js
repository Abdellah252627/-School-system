// نظام الاختبارات والتقييم

// هيكل بيانات نظام الاختبارات (بيانات محاكاة)
const examData = {
  // أنواع الاختبارات
  examTypes: [
    { id: "type1", name: "اختبار فصلي", weight: 0.4 },
    { id: "type2", name: "اختبار شهري", weight: 0.2 },
    { id: "type3", name: "اختبار قصير", weight: 0.1 },
    { id: "type4", name: "اختبار عملي", weight: 0.15 },
    { id: "type5", name: "اختبار نهائي", weight: 0.5 }
  ],

  // أنواع الأسئلة
  questionTypes: [
    { id: "qtype1", name: "اختيار من متعدد", icon: "list-ul" },
    { id: "qtype2", name: "صح/خطأ", icon: "check-square" },
    { id: "qtype3", name: "مقالي", icon: "paragraph" },
    { id: "qtype4", name: "إكمال الفراغات", icon: "edit" },
    { id: "qtype5", name: "مطابقة", icon: "th-list" },
    { id: "qtype6", name: "ترتيب", icon: "sort-numeric-down" },
    { id: "qtype7", name: "رسم", icon: "paint-brush" },
    { id: "qtype8", name: "اختيار متعدد الإجابات", icon: "check-double" }
  ],

  // بنك الأسئلة
  questionBank: [
    {
      id: "q1",
      typeId: "qtype1", // اختيار من متعدد
      subjectId: "sub1", // الرياضيات
      text: "ما هو ناتج 2 + 2 × 3؟",
      options: [
        { id: "opt1", text: "8" },
        { id: "opt2", text: "10" },
        { id: "opt3", text: "12" },
        { id: "opt4", text: "6" }
      ],
      correctAnswer: "opt4", // 8
      difficulty: "medium", // متوسط
      grade: "9", // الصف التاسع
      topic: "العمليات الحسابية",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-01-15",
      points: 2
    },
    {
      id: "q2",
      typeId: "qtype2", // صح/خطأ
      subjectId: "sub2", // العلوم
      text: "الماء مركب كيميائي يتكون من ذرتي هيدروجين وذرة أكسجين.",
      correctAnswer: "true",
      difficulty: "easy", // سهل
      grade: "9", // الصف التاسع
      topic: "المركبات الكيميائية",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-01-20",
      points: 1
    },
    {
      id: "q3",
      typeId: "qtype3", // مقالي
      subjectId: "sub3", // اللغة العربية
      text: "اكتب مقالاً قصيراً عن أهمية القراءة في حياة الإنسان.",
      rubric: [
        { criterion: "المحتوى", maxPoints: 5 },
        { criterion: "التنظيم", maxPoints: 3 },
        { criterion: "اللغة", maxPoints: 2 }
      ],
      difficulty: "hard", // صعب
      grade: "9", // الصف التاسع
      topic: "التعبير",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-02-10",
      points: 10
    },
    {
      id: "q4",
      typeId: "qtype1", // اختيار من متعدد
      subjectId: "sub2", // العلوم
      text: "أي من الآتي ليس من العناصر الكيميائية؟",
      options: [
        { id: "opt1", text: "الأكسجين" },
        { id: "opt2", text: "الهيدروجين" },
        { id: "opt3", text: "الماء" },
        { id: "opt4", text: "الكربون" }
      ],
      correctAnswer: "opt3", // الماء
      difficulty: "medium", // متوسط
      grade: "9", // الصف التاسع
      topic: "العناصر والمركبات",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-02-15",
      points: 2
    },
    {
      id: "q5",
      typeId: "qtype4", // إكمال الفراغات
      subjectId: "sub4", // اللغة الإنجليزية
      text: "The capital of France is ______.",
      correctAnswer: "Paris",
      difficulty: "easy", // سهل
      grade: "9", // الصف التاسع
      topic: "Geography",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-03-05",
      points: 1
    }
  ],

  // الاختبارات
  exams: [
    {
      id: "exam1",
      title: "اختبار الفصل الأول - الرياضيات",
      subjectId: "sub1", // الرياضيات
      typeId: "type1", // اختبار فصلي
      classroomId: "cls1", // الصف التاسع - أ
      totalPoints: 30,
      passingPoints: 15,
      duration: 60, // بالدقائق
      scheduledDate: "2024-05-15",
      scheduledTime: "09:00",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-04-20",
      questions: [
        {
          questionId: "q1",
          points: 2,
          order: 1
        },
        // المزيد من الأسئلة...
      ],
      instructions: "أجب على جميع الأسئلة. استخدم القلم الأزرق أو الأسود فقط.",
      status: "scheduled", // مجدول
      isActive: true
    },
    {
      id: "exam2",
      title: "اختبار شهري - العلوم",
      subjectId: "sub2", // العلوم
      typeId: "type2", // اختبار شهري
      classroomId: "cls1", // الصف التاسع - أ
      totalPoints: 20,
      passingPoints: 10,
      duration: 45, // بالدقائق
      scheduledDate: "2024-05-10",
      scheduledTime: "10:30",
      createdBy: "2", // أحمد المعلم
      createdAt: "2024-04-15",
      questions: [
        {
          questionId: "q2",
          points: 1,
          order: 1
        },
        {
          questionId: "q4",
          points: 2,
          order: 2
        },
        // المزيد من الأسئلة...
      ],
      instructions: "أجب على جميع الأسئلة. لا يسمح باستخدام الآلة الحاسبة.",
      status: "completed", // مكتمل
      isActive: true
    }
  ],

  // نتائج الطلاب
  results: [
    {
      id: "res1",
      examId: "exam2", // اختبار شهري - العلوم
      studentId: "3", // محمد الطالب
      startTime: "2024-05-10T10:30:00",
      endTime: "2024-05-10T11:15:00",
      answers: [
        {
          questionId: "q2",
          answer: "true",
          points: 1,
          isCorrect: true
        },
        {
          questionId: "q4",
          answer: "opt3",
          points: 2,
          isCorrect: true
        },
        // المزيد من الإجابات...
      ],
      totalPoints: 18,
      percentage: 90,
      status: "graded", // مصحح
      feedback: "أداء ممتاز. استمر على هذا المستوى.",
      gradedBy: "2", // أحمد المعلم
      gradedAt: "2024-05-11T14:30:00"
    }
  ],

  // تقديرات المواد
  subjectGrades: [
    {
      id: "sg1",
      studentId: "3", // محمد الطالب
      subjectId: "sub1", // الرياضيات
      semester: "الفصل الأول",
      schoolYear: "2023-2024",
      examGrades: [
        {
          examId: "exam1",
          points: 25,
          totalPoints: 30,
          percentage: 83.33,
          weight: 0.4
        },
        // المزيد من درجات الاختبارات...
      ],
      homeworkGrades: [
        {
          homeworkId: "hw1",
          points: 9,
          totalPoints: 10,
          percentage: 90,
          weight: 0.1
        },
        // المزيد من درجات الواجبات...
      ],
      participationGrade: {
        points: 8,
        totalPoints: 10,
        percentage: 80,
        weight: 0.1
      },
      finalGrade: 85, // من 100
      letterGrade: "A",
      comments: "طالب مجتهد ومتفوق في الرياضيات."
    }
  ],

  // شهادات الطلاب
  transcripts: [
    {
      id: "tr1",
      studentId: "3", // محمد الطالب
      semester: "الفصل الأول",
      schoolYear: "2023-2024",
      grades: [
        {
          subjectId: "sub1", // الرياضيات
          finalGrade: 85,
          letterGrade: "A"
        },
        {
          subjectId: "sub2", // العلوم
          finalGrade: 90,
          letterGrade: "A+"
        },
        {
          subjectId: "sub3", // اللغة العربية
          finalGrade: 82,
          letterGrade: "B+"
        },
        {
          subjectId: "sub4", // اللغة الإنجليزية
          finalGrade: 88,
          letterGrade: "A"
        },
        // المزيد من الدرجات...
      ],
      gpa: 3.8,
      attendance: 95, // نسبة الحضور
      behavior: "ممتاز",
      teacherComments: "طالب مجتهد ومتفوق في جميع المواد.",
      principalComments: "نفتخر بمستوى الطالب المتميز.",
      issueDate: "2024-01-20",
      status: "published" // منشورة
    }
  ]
};

// الحصول على جميع أنواع الاختبارات
function getExamTypes() {
  return examData.examTypes;
}

// الحصول على جميع أنواع الأسئلة
function getQuestionTypes() {
  return examData.questionTypes;
}

// البحث في بنك الأسئلة
function searchQuestions(filters = {}) {
  let filteredQuestions = [...examData.questionBank];
  
  // تطبيق التصفية حسب المادة
  if (filters.subjectId) {
    filteredQuestions = filteredQuestions.filter(q => q.subjectId === filters.subjectId);
  }
  
  // تطبيق التصفية حسب نوع السؤال
  if (filters.typeId) {
    filteredQuestions = filteredQuestions.filter(q => q.typeId === filters.typeId);
  }
  
  // تطبيق التصفية حسب الصف
  if (filters.grade) {
    filteredQuestions = filteredQuestions.filter(q => q.grade === filters.grade);
  }
  
  // تطبيق التصفية حسب مستوى الصعوبة
  if (filters.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === filters.difficulty);
  }
  
  // تطبيق التصفية حسب الموضوع
  if (filters.topic) {
    filteredQuestions = filteredQuestions.filter(q => 
      q.topic.toLowerCase().includes(filters.topic.toLowerCase())
    );
  }
  
  // تطبيق التصفية حسب النص
  if (filters.text) {
    filteredQuestions = filteredQuestions.filter(q => 
      q.text.toLowerCase().includes(filters.text.toLowerCase())
    );
  }
  
  return filteredQuestions.map(question => {
    const questionType = examData.questionTypes.find(type => type.id === question.typeId);
    const subject = scheduleData.subjects.find(sub => sub.id === question.subjectId);
    
    return {
      ...question,
      typeName: questionType?.name,
      typeIcon: questionType?.icon,
      subjectName: subject?.name
    };
  });
}

// إضافة سؤال جديد إلى بنك الأسئلة
function addQuestion(questionData) {
  const id = "q" + (examData.questionBank.length + 1);
  const now = new Date().toISOString().split('T')[0];
  
  const newQuestion = {
    id,
    ...questionData,
    createdAt: now
  };
  
  examData.questionBank.push(newQuestion);
  
  return newQuestion;
}

// تحديث سؤال موجود
function updateQuestion(questionId, updates) {
  const questionIndex = examData.questionBank.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    return null;
  }
  
  examData.questionBank[questionIndex] = {
    ...examData.questionBank[questionIndex],
    ...updates
  };
  
  return examData.questionBank[questionIndex];
}

// حذف سؤال
function deleteQuestion(questionId) {
  const questionIndex = examData.questionBank.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    return false;
  }
  
  // التحقق من عدم استخدام السؤال في أي اختبار
  const isUsedInExam = examData.exams.some(exam => 
    exam.questions.some(q => q.questionId === questionId)
  );
  
  if (isUsedInExam) {
    return { success: false, message: "لا يمكن حذف السؤال لأنه مستخدم في اختبار" };
  }
  
  examData.questionBank.splice(questionIndex, 1);
  
  return { success: true };
}

// إنشاء اختبار جديد
function createExam(examData) {
  const id = "exam" + (examData.exams.length + 1);
  const now = new Date().toISOString().split('T')[0];
  
  const newExam = {
    id,
    ...examData,
    createdAt: now,
    status: "draft", // مسودة
    isActive: true
  };
  
  examData.exams.push(newExam);
  
  return newExam;
}

// الحصول على تفاصيل اختبار محدد
function getExamById(examId) {
  const exam = examData.exams.find(e => e.id === examId);
  
  if (!exam) {
    return null;
  }
  
  const subject = scheduleData.subjects.find(sub => sub.id === exam.subjectId);
  const examType = examData.examTypes.find(type => type.id === exam.typeId);
  const classroom = scheduleData.classrooms.find(cls => cls.id === exam.classroomId);
  const teacher = users.find(user => user.id === exam.createdBy);
  
  // الحصول على الأسئلة الكاملة
  const questions = exam.questions.map(q => {
    const questionData = examData.questionBank.find(qb => qb.id === q.questionId);
    
    if (!questionData) {
      return {
        ...q,
        notFound: true
      };
    }
    
    const questionType = examData.questionTypes.find(type => type.id === questionData.typeId);
    
    return {
      ...q,
      ...questionData,
      typeName: questionType?.name,
      typeIcon: questionType?.icon
    };
  }).sort((a, b) => a.order - b.order);
  
  return {
    ...exam,
    subject,
    examType,
    classroom,
    teacher,
    questions
  };
}

// الحصول على اختبارات فصل دراسي معين
function getClassroomExams(classroomId, filters = {}) {
  let filteredExams = examData.exams.filter(exam => exam.classroomId === classroomId);
  
  // تطبيق التصفية حسب المادة
  if (filters.subjectId) {
    filteredExams = filteredExams.filter(exam => exam.subjectId === filters.subjectId);
  }
  
  // تطبيق التصفية حسب نوع الاختبار
  if (filters.typeId) {
    filteredExams = filteredExams.filter(exam => exam.typeId === filters.typeId);
  }
  
  // تطبيق التصفية حسب الحالة
  if (filters.status) {
    filteredExams = filteredExams.filter(exam => exam.status === filters.status);
  }
  
  // تطبيق التصفية حسب التاريخ
  if (filters.fromDate && filters.toDate) {
    filteredExams = filteredExams.filter(exam => 
      exam.scheduledDate >= filters.fromDate && exam.scheduledDate <= filters.toDate
    );
  }
  
  return filteredExams.map(exam => {
    const subject = scheduleData.subjects.find(sub => sub.id === exam.subjectId);
    const examType = examData.examTypes.find(type => type.id === exam.typeId);
    const classroom = scheduleData.classrooms.find(cls => cls.id === exam.classroomId);
    
    return {
      ...exam,
      subjectName: subject?.name,
      examTypeName: examType?.name,
      classroomName: classroom?.name,
      questionsCount: exam.questions.length
    };
  });
}

// الحصول على اختبارات معلم معين
function getTeacherExams(teacherId, filters = {}) {
  let filteredExams = examData.exams.filter(exam => exam.createdBy === teacherId);
  
  // تطبيق التصفية حسب المادة
  if (filters.subjectId) {
    filteredExams = filteredExams.filter(exam => exam.subjectId === filters.subjectId);
  }
  
  // تطبيق التصفية حسب الفصل
  if (filters.classroomId) {
    filteredExams = filteredExams.filter(exam => exam.classroomId === filters.classroomId);
  }
  
  // تطبيق التصفية حسب نوع الاختبار
  if (filters.typeId) {
    filteredExams = filteredExams.filter(exam => exam.typeId === filters.typeId);
  }
  
  // تطبيق التصفية حسب الحالة
  if (filters.status) {
    filteredExams = filteredExams.filter(exam => exam.status === filters.status);
  }
  
  // تطبيق التصفية حسب التاريخ
  if (filters.fromDate && filters.toDate) {
    filteredExams = filteredExams.filter(exam => 
      exam.scheduledDate >= filters.fromDate && exam.scheduledDate <= filters.toDate
    );
  }
  
  return filteredExams.map(exam => {
    const subject = scheduleData.subjects.find(sub => sub.id === exam.subjectId);
    const examType = examData.examTypes.find(type => type.id === exam.typeId);
    const classroom = scheduleData.classrooms.find(cls => cls.id === exam.classroomId);
    
    return {
      ...exam,
      subjectName: subject?.name,
      examTypeName: examType?.name,
      classroomName: classroom?.name,
      questionsCount: exam.questions.length
    };
  });
}

// الحصول على اختبارات طالب معين
function getStudentExams(studentId, filters = {}) {
  // افتراض أن الطالب في فصل معين (الصف التاسع أ)
  const classroomId = "cls1";
  
  let filteredExams = examData.exams.filter(exam => 
    exam.classroomId === classroomId && exam.isActive
  );
  
  // تطبيق التصفية حسب المادة
  if (filters.subjectId) {
    filteredExams = filteredExams.filter(exam => exam.subjectId === filters.subjectId);
  }
  
  // تطبيق التصفية حسب نوع الاختبار
  if (filters.typeId) {
    filteredExams = filteredExams.filter(exam => exam.typeId === filters.typeId);
  }
  
  // تطبيق التصفية حسب الحالة
  if (filters.status) {
    filteredExams = filteredExams.filter(exam => exam.status === filters.status);
  }
  
  // تطبيق التصفية حسب التاريخ
  if (filters.fromDate && filters.toDate) {
    filteredExams = filteredExams.filter(exam => 
      exam.scheduledDate >= filters.fromDate && exam.scheduledDate <= filters.toDate
    );
  }
  
  return filteredExams.map(exam => {
    const subject = scheduleData.subjects.find(sub => sub.id === exam.subjectId);
    const examType = examData.examTypes.find(type => type.id === exam.typeId);
    
    // التحقق مما إذا كان الطالب قد أدى الاختبار بالفعل
    const studentResult = examData.results.find(res => 
      res.examId === exam.id && res.studentId === studentId
    );
    
    return {
      ...exam,
      subjectName: subject?.name,
      examTypeName: examType?.name,
      hasResult: !!studentResult,
      result: studentResult,
      status: studentResult ? "completed" : exam.status
    };
  });
}

// تسجيل إجابات الطالب على اختبار
function submitExamAnswers(examId, studentId, answers) {
  const exam = examData.exams.find(e => e.id === examId);
  
  if (!exam) {
    return { success: false, message: "الاختبار غير موجود" };
  }
  
  // التحقق مما إذا كان الطالب قد أدى الاختبار بالفعل
  const existingResult = examData.results.find(res => 
    res.examId === examId && res.studentId === studentId
  );
  
  if (existingResult) {
    return { success: false, message: "لقد أديت هذا الاختبار بالفعل" };
  }
  
  const now = new Date().toISOString();
  const id = "res" + (examData.results.length + 1);
  
  // حساب الدرجات للأسئلة الموضوعية (اختيار من متعدد، صح/خطأ)
  const processedAnswers = answers.map(ans => {
    const questionData = exam.questions.find(q => q.questionId === ans.questionId);
    const question = examData.questionBank.find(q => q.id === ans.questionId);
    
    if (!question || !questionData) {
      return {
        ...ans,
        points: 0,
        isCorrect: false
      };
    }
    
    let isCorrect = false;
    let points = 0;
    
    // التحقق من الإجابة للأسئلة الموضوعية
    if (["qtype1", "qtype2", "qtype8"].includes(question.typeId)) {
      isCorrect = ans.answer === question.correctAnswer;
      points = isCorrect ? questionData.points : 0;
    } else {
      // الأسئلة المقالية تحتاج إلى تصحيح يدوي
      isCorrect = null;
      points = null;
    }
    
    return {
      ...ans,
      points,
      isCorrect
    };
  });
  
  // حساب مجموع الدرجات للأسئلة المصححة تلقائياً
  const automaticallyGradedAnswers = processedAnswers.filter(ans => ans.points !== null);
  const totalPoints = automaticallyGradedAnswers.reduce((sum, ans) => sum + ans.points, 0);
  const totalPossiblePoints = automaticallyGradedAnswers.reduce((sum, ans) => {
    const questionData = exam.questions.find(q => q.questionId === ans.questionId);
    return sum + (questionData ? questionData.points : 0);
  }, 0);
  
  // حساب النسبة المئوية للأسئلة المصححة تلقائياً
  const percentage = totalPossiblePoints > 0 ? (totalPoints / totalPossiblePoints) * 100 : 0;
  
  const newResult = {
    id,
    examId,
    studentId,
    startTime: now, // يمكن تحديد وقت البدء الفعلي إذا كان متاحاً
    endTime: now,
    answers: processedAnswers,
    totalPoints, // الدرجة المؤقتة (قبل تصحيح الأسئلة المقالية)
    percentage, // النسبة المئوية المؤقتة
    status: processedAnswers.some(ans => ans.isCorrect === null) ? "pending" : "graded",
    feedback: "",
    gradedBy: null,
    gradedAt: null
  };
  
  examData.results.push(newResult);
  
  return { success: true, result: newResult };
}

// تصحيح إجابات الطلاب (للأسئلة المقالية وتحديث الدرجات)
function gradeExamAnswers(resultId, gradeData, teacherId) {
  const resultIndex = examData.results.findIndex(res => res.id === resultId);
  
  if (resultIndex === -1) {
    return { success: false, message: "النتيجة غير موجودة" };
  }
  
  const result = examData.results[resultIndex];
  const exam = examData.exams.find(e => e.id === result.examId);
  
  if (!exam) {
    return { success: false, message: "الاختبار غير موجود" };
  }
  
  // تحديث درجات الأسئلة المقالية
  gradeData.answers.forEach(gradedAnswer => {
    const answerIndex = result.answers.findIndex(ans => ans.questionId === gradedAnswer.questionId);
    
    if (answerIndex !== -1) {
      result.answers[answerIndex].points = gradedAnswer.points;
      result.answers[answerIndex].isCorrect = gradedAnswer.points > 0;
      result.answers[answerIndex].feedback = gradedAnswer.feedback;
    }
  });
  
  // إعادة حساب الدرجة الكلية
  const totalPoints = result.answers.reduce((sum, ans) => sum + (ans.points || 0), 0);
  const totalPossiblePoints = exam.totalPoints;
  
  // حساب النسبة المئوية
  const percentage = totalPossiblePoints > 0 ? (totalPoints / totalPossiblePoints) * 100 : 0;
  
  const now = new Date().toISOString();
  
  // تحديث نتيجة الاختبار
  examData.results[resultIndex] = {
    ...result,
    totalPoints,
    percentage,
    status: "graded",
    feedback: gradeData.feedback,
    gradedBy: teacherId,
    gradedAt: now
  };
  
  return { success: true, result: examData.results[resultIndex] };
}

// إصدار شهادة درجات للطالب
function generateTranscript(studentId, semester, schoolYear) {
  // الحصول على درجات الطالب في جميع المواد
  const subjectGrades = examData.subjectGrades.filter(grade => 
    grade.studentId === studentId &&
    grade.semester === semester &&
    grade.schoolYear === schoolYear
  );
  
  if (subjectGrades.length === 0) {
    return { success: false, message: "لا توجد درجات متاحة لهذا الطالب في هذا الفصل الدراسي" };
  }
  
  // حساب المعدل التراكمي
  const totalGradePoints = subjectGrades.reduce((sum, grade) => sum + convertToGPA(grade.finalGrade), 0);
  const gpa = subjectGrades.length > 0 ? totalGradePoints / subjectGrades.length : 0;
  
  // الحصول على بيانات الطالب
  const student = users.find(user => user.id === studentId);
  
  if (!student) {
    return { success: false, message: "الطالب غير موجود" };
  }
  
  // إنشاء مصفوفة الدرجات
  const grades = subjectGrades.map(grade => {
    const subject = scheduleData.subjects.find(sub => sub.id === grade.subjectId);
    
    return {
      subjectId: grade.subjectId,
      subjectName: subject?.name,
      finalGrade: grade.finalGrade,
      letterGrade: grade.letterGrade
    };
  });
  
  // افتراض نسبة حضور وبيانات سلوك الطالب
  const attendance = 95;
  const behavior = "ممتاز";
  
  const now = new Date().toISOString().split('T')[0];
  const id = "tr" + (examData.transcripts.length + 1);
  
  const newTranscript = {
    id,
    studentId,
    studentName: student.name,
    semester,
    schoolYear,
    grades,
    gpa,
    attendance,
    behavior,
    teacherComments: "طالب مجتهد ومتفوق في جميع المواد.",
    principalComments: "نفتخر بمستوى الطالب المتميز.",
    issueDate: now,
    status: "published"
  };
  
  examData.transcripts.push(newTranscript);
  
  return { success: true, transcript: newTranscript };
}

// تحويل الدرجة المئوية إلى معدل تراكمي
function convertToGPA(percentage) {
  if (percentage >= 90) return 4.0;
  if (percentage >= 85) return 3.7;
  if (percentage >= 80) return 3.3;
  if (percentage >= 75) return 3.0;
  if (percentage >= 70) return 2.7;
  if (percentage >= 65) return 2.3;
  if (percentage >= 60) return 2.0;
  if (percentage >= 55) return 1.7;
  if (percentage >= 50) return 1.0;
  return 0.0;
}

// الحصول على نتائج طالب معين
function getStudentResults(studentId, filters = {}) {
  let filteredResults = examData.results.filter(res => res.studentId === studentId);
  
  // تطبيق التصفية حسب المادة
  if (filters.subjectId) {
    filteredResults = filteredResults.filter(res => {
      const exam = examData.exams.find(e => e.id === res.examId);
      return exam && exam.subjectId === filters.subjectId;
    });
  }
  
  // تطبيق التصفية حسب نوع الاختبار
  if (filters.examType) {
    filteredResults = filteredResults.filter(res => {
      const exam = examData.exams.find(e => e.id === res.examId);
      return exam && exam.typeId === filters.examType;
    });
  }
  
  // تطبيق التصفية حسب التاريخ
  if (filters.fromDate && filters.toDate) {
    filteredResults = filteredResults.filter(res => {
      const exam = examData.exams.find(e => e.id === res.examId);
      return exam && exam.scheduledDate >= filters.fromDate && exam.scheduledDate <= filters.toDate;
    });
  }
  
  return filteredResults.map(result => {
    const exam = examData.exams.find(e => e.id === result.examId);
    const subject = exam ? scheduleData.subjects.find(sub => sub.id === exam.subjectId) : null;
    const examType = exam ? examData.examTypes.find(type => type.id === exam.typeId) : null;
    
    return {
      ...result,
      exam,
      subjectName: subject?.name,
      examTypeName: examType?.name,
      letterGrade: convertPercentageToLetterGrade(result.percentage)
    };
  });
}

// تحويل النسبة المئوية إلى تقدير حرفي
function convertPercentageToLetterGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 85) return "A";
  if (percentage >= 80) return "B+";
  if (percentage >= 75) return "B";
  if (percentage >= 70) return "C+";
  if (percentage >= 65) return "C";
  if (percentage >= 60) return "D+";
  if (percentage >= 50) return "D";
  return "F";
}

// تصدير الوظائف
window.examSystem = {
  getExamTypes,
  getQuestionTypes,
  searchQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  createExam,
  getExamById,
  getClassroomExams,
  getTeacherExams,
  getStudentExams,
  submitExamAnswers,
  gradeExamAnswers,
  generateTranscript,
  getStudentResults,
  examData
};