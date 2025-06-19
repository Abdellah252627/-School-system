const express = require('express');
const router = express.Router();
const Homework = require('../models/Homework');
const Student = require('../models/Student');
const multer = require('multer');
const path = require('path');

// إعداد multer لرفع الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/homework/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Middleware للتحقق من الصلاحيات
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

const isTeacher = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'teacher') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

const isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'student') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isAuthenticated);

// الحصول على جميع الواجبات (للمعلم)
router.get('/', isTeacher, async (req, res) => {
  try {
    const homework = await Homework.find({ teacher: req.session.user.id })
      .populate('teacher', 'name')
      .sort({ createdAt: -1 });
    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على واجبات الطالب
router.get('/student', isStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.session.user.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const homework = await Homework.find({ 
      grade: student.grade,
      classroom: student.classroom,
      isActive: true
    }).populate('teacher', 'name')
      .sort({ dueDate: 1 });
    
    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// إنشاء واجب جديد (للمعلم)
router.post('/', isTeacher, upload.array('attachments', 5), async (req, res) => {
  try {
    const { title, description, subject, grade, classroom, dueDate, instructions, maxScore } = req.body;
    
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size
    })) : [];
    
    const homework = new Homework({
      title,
      description,
      subject,
      grade,
      classroom,
      teacher: req.session.user.id,
      dueDate: new Date(dueDate),
      attachments,
      instructions,
      maxScore: maxScore || 100
    });
    
    await homework.save();
    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تسليم واجب (للطالب)
router.post('/:homeworkId/submit', isStudent, upload.array('files', 5), async (req, res) => {
  try {
    const { notes } = req.body;
    const homeworkId = req.params.homeworkId;
    
    const student = await Student.findOne({ user: req.session.user.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const homework = await Homework.findById(homeworkId);
    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }
    
    // التحقق من أن الطالب لم يسلم الواجب من قبل
    const existingSubmission = homework.submissions.find(sub => 
      sub.student.toString() === student._id.toString()
    );
    
    if (existingSubmission) {
      return res.status(400).json({ message: 'Homework already submitted' });
    }
    
    const files = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size
    })) : [];
    
    const submission = {
      student: student._id,
      files,
      notes,
      status: new Date() > homework.dueDate ? 'late' : 'submitted'
    };
    
    homework.submissions.push(submission);
    await homework.save();
    
    res.json({ message: 'Homework submitted successfully', submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// تقييم واجب (للمعلم)
router.put('/:homeworkId/grade/:submissionId', isTeacher, async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const { homeworkId, submissionId } = req.params;
    
    const homework = await Homework.findById(homeworkId);
    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }
    
    const submission = homework.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.score = score;
    submission.feedback = feedback;
    submission.status = 'graded';
    
    await homework.save();
    
    // إضافة الدرجة إلى سجل الطالب
    const student = await Student.findById(submission.student);
    if (student) {
      student.grades.push({
        subject: homework.subject,
        type: 'homework',
        score: score,
        maxScore: homework.maxScore,
        teacher: req.session.user.id,
        notes: `واجب: ${homework.title}`
      });
      await student.save();
    }
    
    res.json({ message: 'Homework graded successfully', submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// الحصول على تفاصيل واجب معين
router.get('/:id', async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id)
      .populate('teacher', 'name')
      .populate({
        path: 'submissions.student',
        populate: {
          path: 'user',
          select: 'name'
        }
      });
    
    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }
    
    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// حذف واجب (للمعلم)
router.delete('/:id', isTeacher, async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }
    
    if (homework.teacher.toString() !== req.session.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    homework.isActive = false;
    await homework.save();
    
    res.json({ message: 'Homework deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;