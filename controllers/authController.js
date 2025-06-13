const User = require('../models/User');

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }
    
    // Check password
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }
    
    // Create session
    req.session.user = {
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email
    };
    
    res.json({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'فشل تسجيل الخروج' });
    }
    res.json({ message: 'تم تسجيل الخروج بنجاح' });
  });
};

// Check if user is logged in
exports.checkAuth = (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  res.status(401).json({ message: 'غير مصرح' });
};