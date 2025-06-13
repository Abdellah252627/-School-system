const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

// Initialize express app
const app = express();

// استخدام قاعدة بيانات في الذاكرة للاختبار
const { connectTestDB } = require('./config/test-db');

// Connect to in-memory MongoDB
connectTestDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'school_system_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/school_system',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/teacher', require('./routes/teacher'));
app.use('/student', require('./routes/student'));
app.use('/parent', require('./routes/parent'));
app.use('/finance', require('./routes/finance'));
app.use('/homework', require('./routes/homework'));
app.use('/library', require('./routes/library'));
app.use('/schedule', require('./routes/schedule'));
app.use('/notifications', require('./routes/notifications'));

// Serve the main HTML file for all routes (SPA approach)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));