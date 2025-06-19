const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Middleware to check if user is student
const isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'student') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isStudent);

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.session.user.id })
      .populate('user', '-password')
      .populate('parent', '-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get student grades
router.get('/grades', async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.session.user.id })
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

// Get student attendance
router.get('/attendance', async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.session.user.id });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student.attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;