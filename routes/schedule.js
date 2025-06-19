const express = require('express');
const router = express.Router();
const { Schedule, ExamSchedule } = require('../models/Schedule');

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

// الحصول على الجدول الدراسي
router.get('/class/:grade/:classroom', async (req, res) => {
  try {
    const { grade, classroom } = req.params;
    const { schoolYear } = req.query;
    
    const schedule = await Schedule.findOne({
      grade,
      classroom,
      schoolYear: schoolYear || '2024-2025',
      isActive: true
    }).populate('schedule.periods.teacher', 'name');
    
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إنشاء أو تحديث جدول دراسي
router.post('/class', isAdminOrTeacher, async (req, res) => {
  try {
    const { grade, classroom, schoolYear, schedule } = req.body;
    
    let existingSchedule = await Schedule.findOne({
      grade,
      classroom,
      schoolYear: schoolYear || '2024-2025'
    });
    
    if (existingSchedule) {
      existingSchedule.schedule = schedule;
      await existingSchedule.save();
      res.json(existingSchedule);
    } else {
      const newSchedule = new Schedule({
        grade,
        classroom,
        schoolYear: schoolYear || '2024-2025',
        schedule
      });
      await newSchedule.save();
      res.json(newSchedule);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جميع الجداول
router.get('/all', isAdminOrTeacher, async (req, res) => {
  try {
    const { schoolYear } = req.query;
    
    const schedules = await Schedule.find({
      schoolYear: schoolYear || '2024-2025',
      isActive: true
    }).populate('schedule.periods.teacher', 'name');
    
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على جدول المعلم
router.get('/teacher', async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const { schoolYear } = req.query;
    
    const schedules = await Schedule.find({
      'schedule.periods.teacher': teacherId,
      schoolYear: schoolYear || '2024-2025',
      isActive: true
    });
    
    // تنظيم البيانات لعرض جدول المعلم
    const teacherSchedule = [];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
    
    days.forEach(day => {
      const daySchedule = { day, periods: [] };
      
      schedules.forEach(schedule => {
        const dayData = schedule.schedule.find(s => s.day === day);
        if (dayData) {
          dayData.periods.forEach(period => {
            if (period.teacher && period.teacher.toString() === teacherId) {
              daySchedule.periods.push({
                ...period.toObject(),
                grade: schedule.grade,
                classroom: schedule.classroom
              });
            }
          });
        }
      });
      
      // ترتيب الحصص حسب الوقت
      daySchedule.periods.sort((a, b) => a.periodNumber - b.periodNumber);
      teacherSchedule.push(daySchedule);
    });
    
    res.json(teacherSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// جداول الامتحانات

// الحصول على جدول امتحانات
router.get('/exams/:grade', async (req, res) => {
  try {
    const { grade } = req.params;
    const { examType, classroom } = req.query;
    
    let query = { grade, isActive: true };
    if (examType) query.examType = examType;
    if (classroom) query.classroom = classroom;
    
    const examSchedules = await ExamSchedule.find(query)
      .populate('exams.teacher', 'name')
      .sort({ 'exams.date': 1 });
    
    res.json(examSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إنشاء جدول امتحانات
router.post('/exams', isAdminOrTeacher, async (req, res) => {
  try {
    const examSchedule = new ExamSchedule(req.body);
    await examSchedule.save();
    res.json(examSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تحديث جدول امتحانات
router.put('/exams/:id', isAdminOrTeacher, async (req, res) => {
  try {
    const examSchedule = await ExamSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!examSchedule) {
      return res.status(404).json({ message: 'Exam schedule not found' });
    }
    
    res.json(examSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// حذف جدول امتحانات
router.delete('/exams/:id', isAdminOrTeacher, async (req, res) => {
  try {
    const examSchedule = await ExamSchedule.findById(req.params.id);
    if (!examSchedule) {
      return res.status(404).json({ message: 'Exam schedule not found' });
    }
    
    examSchedule.isActive = false;
    await examSchedule.save();
    
    res.json({ message: 'Exam schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على امتحانات المعلم
router.get('/exams/teacher/my', async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    
    const examSchedules = await ExamSchedule.find({
      'exams.teacher': teacherId,
      isActive: true
    }).populate('exams.teacher', 'name');
    
    // استخراج الامتحانات الخاصة بالمعلم فقط
    const teacherExams = [];
    examSchedules.forEach(schedule => {
      schedule.exams.forEach(exam => {
        if (exam.teacher && exam.teacher._id.toString() === teacherId) {
          teacherExams.push({
            ...exam.toObject(),
            examType: schedule.examType,
            grade: schedule.grade,
            classroom: schedule.classroom,
            scheduleId: schedule._id
          });
        }
      });
    });
    
    // ترتيب حسب التاريخ
    teacherExams.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.json(teacherExams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على الصفوف والفصول المتاحة
router.get('/classes', isAdminOrTeacher, async (req, res) => {
  try {
    const classes = await Schedule.distinct('grade', { isActive: true });
    const classrooms = await Schedule.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$grade', classrooms: { $addToSet: '$classroom' } } }
    ]);
    
    res.json({ classes, classrooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;