const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Middleware to check if user is teacher
const isTeacher = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'teacher') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isTeacher);

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().populate('user', '-password');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add student grade
router.post('/grades', async (req, res) => {
  try {
    const { studentId, subject, score, maxScore, type, notes } = req.body;
    
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // إضافة الدرجة إلى سجل الطالب
    student.grades.push({
      subject,
      type,
      score,
      maxScore,
      teacher: req.session.user.id,
      notes
    });
    
    await student.save();
    
    res.status(201).json({ message: 'Grade added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get student grades
router.get('/students/:studentId/grades', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .populate('grades.teacher', 'name');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student.grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update student attendance
router.post('/attendance', async (req, res) => {
  try {
    const { studentId, date, status, notes } = req.body;
    
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if attendance record for the date already exists
    const existingIndex = student.attendance.findIndex(
      a => new Date(a.date).toDateString() === new Date(date).toDateString()
    );
    
    if (existingIndex !== -1) {
      // Update existing record
      student.attendance[existingIndex].status = status;
      student.attendance[existingIndex].notes = notes;
    } else {
      // Add new attendance record
      student.attendance.push({
        date,
        status,
        notes
      });
    }
    
    await student.save();
    
    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// TODO: إضافة وظائف الرسائل لاحقاً

module.exports = router;