require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/school_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('Could not connect to MongoDB', err);
  process.exit(1);
});

// Create admin user
async function setup() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      // Create admin user
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
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Setup completed');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

// Run setup
setup();