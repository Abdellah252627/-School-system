const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');

// Middleware to check if user is parent
const isParent = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'parent') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isParent);

// Get children
router.get('/children', async (req, res) => {
  try {
    const students = await Student.find({ parent: req.session.user.id })
      .populate('user', '-password');
    
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get child grades
router.get('/children/:studentId/grades', async (req, res) => {
  try {
    // Verify that the student belongs to this parent
    const student = await Student.findOne({
      _id: req.params.studentId,
      parent: req.session.user.id
    }).populate('grades.teacher', 'name');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found or not your child' });
    }
    
    res.json(student.grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get child attendance
router.get('/children/:studentId/attendance', async (req, res) => {
  try {
    // Verify that the student belongs to this parent
    const student = await Student.findOne({
      _id: req.params.studentId,
      parent: req.session.user.id
    });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found or not your child' });
    }
    
    res.json(student.attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// TODO: إضافة وظائف الرسائل لاحقاً

module.exports = router;