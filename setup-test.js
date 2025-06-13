require('dotenv').config();
const { connectTestDB } = require('./config/test-db');
const User = require('./models/User');

// إنشاء مستخدم المدير للاختبار
async function setup() {
  try {
    // الاتصال بقاعدة البيانات
    await connectTestDB();
    
    // التحقق من وجود المدير
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      // إنشاء مستخدم المدير
      const admin = new User({
        username: 'admin',
        password: 'admin123',
        name: 'مدير النظام',
        role: 'admin',
        email: 'admin@school.com',
        phone: '123456789'
      });
      
      await admin.save();
      console.log('Admin user created successfully');
      console.log('Username: admin');
      console.log('Password: admin123');
    }
    
    console.log('Setup completed successfully!');
    console.log('You can now start the server with: npm start');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

// تشغيل الإعداد
setup();