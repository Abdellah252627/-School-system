const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Access denied' });
};

router.use(isAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add new user
router.post('/users', async (req, res) => {
  try {
    const { username, password, name, role, email, phone } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      username,
      password,
      name,
      role,
      email,
      phone
    });
    
    await user.save();
    
    // If user is a student, create student record
    if (role === 'student') {
      const { grade, classroom, parent } = req.body;
      
      // حساب الرسوم الإجمالية للطالب
      const FeeStructure = require('../models/FeeStructure');
      const fees = await FeeStructure.find({ 
        $or: [{ grade }, { grade: 'all' }],
        isActive: true 
      });
      
      let totalFees = 0;
      fees.forEach(fee => {
        if (fee.frequency === 'annual') {
          totalFees += fee.amount;
        } else if (fee.frequency === 'semester') {
          totalFees += fee.amount * 2;
        } else if (fee.frequency === 'monthly') {
          totalFees += fee.amount * 10; // 10 أشهر دراسية
        }
      });
      
      const student = new Student({
        user: user._id,
        grade,
        classroom,
        parent,
        financialInfo: {
          totalFees,
          paidAmount: 0,
          remainingAmount: totalFees,
          paymentHistory: []
        }
      });
      
      await student.save();
    }
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    
    // Find and update user
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    
    await user.save();
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If user is student, delete student record
    if (user.role === 'student') {
      await Student.findOneAndDelete({ user: req.params.id });
    }
    
    await user.remove();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;