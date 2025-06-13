const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// Initialize express app
const app = express();

// In-memory store for demo
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'مدير النظام',
    role: 'admin',
    email: 'admin@school.com',
    phone: '123456789'
  },
  {
    id: '2',
    username: 'teacher1',
    password: 'teacher123',
    name: 'أحمد المعلم',
    role: 'teacher',
    email: 'teacher1@school.com',
    phone: '987654321'
  },
  {
    id: '3',
    username: 'student1',
    password: 'student123',
    name: 'محمد الطالب',
    role: 'student',
    email: 'student1@school.com',
    phone: '555555555'
  },
  {
    id: '4',
    username: 'parent1',
    password: 'parent123',
    name: 'خالد ولي الأمر',
    role: 'parent',
    email: 'parent1@example.com',
    phone: '111222333'
  }
];

const students = [
  {
    _id: '1',
    user: {
      id: '3',
      name: 'محمد الطالب',
      email: 'student1@school.com'
    },
    grade: 'الصف التاسع',
    classroom: 'أ',
    parent: {
      id: '4',
      name: 'خالد ولي الأمر'
    },
    attendance: [
      {
        date: new Date('2024-07-10'),
        status: 'present',
        notes: ''
      },
      {
        date: new Date('2024-07-11'),
        status: 'absent',
        notes: 'مرض'
      }
    ]
  }
];

const grades = [
  {
    _id: '1',
    student: '1',
    subject: 'الرياضيات',
    teacher: {
      id: '2',
      name: 'أحمد المعلم'
    },
    score: 85,
    maxScore: 100,
    type: 'quiz',
    date: new Date('2024-07-05'),
    notes: 'أداء جيد'
  },
  {
    _id: '2',
    student: '1',
    subject: 'العلوم',
    teacher: {
      id: '2',
      name: 'أحمد المعلم'
    },
    score: 92,
    maxScore: 100,
    type: 'exam',
    date: new Date('2024-07-15'),
    notes: 'ممتاز'
  }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'school_system_demo_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Auth routes
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
  }
  
  req.session.user = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    email: user.email
  };
  
  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    email: user.email
  });
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
});

app.get('/auth/check', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  res.status(401).json({ message: 'غير مصرح' });
});

// Admin routes
app.get('/admin/users', (req, res) => {
  res.json(users.map(({ password, ...user }) => user));
});

// Teacher routes
app.get('/teacher/students', (req, res) => {
  res.json(students);
});

// Student routes
app.get('/student/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const student = students.find(s => s.user.id === req.session.user.id);
  
  if (!student) {
    return res.status(404).json({ message: 'لم يتم العثور على الملف الشخصي' });
  }
  
  res.json(student);
});

app.get('/student/grades', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const student = students.find(s => s.user.id === req.session.user.id);
  
  if (!student) {
    return res.status(404).json({ message: 'لم يتم العثور على الطالب' });
  }
  
  const studentGrades = grades.filter(g => g.student === student._id);
  res.json(studentGrades);
});

app.get('/student/attendance', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const student = students.find(s => s.user.id === req.session.user.id);
  
  if (!student) {
    return res.status(404).json({ message: 'لم يتم العثور على الطالب' });
  }
  
  res.json(student.attendance);
});

// Parent routes
app.get('/parent/children', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const children = students.filter(s => s.parent.id === req.session.user.id);
  res.json(children);
});

app.get('/parent/children/:studentId/grades', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const student = students.find(s => s._id === req.params.studentId && s.parent.id === req.session.user.id);
  
  if (!student) {
    return res.status(404).json({ message: 'لم يتم العثور على الطالب' });
  }
  
  const studentGrades = grades.filter(g => g.student === student._id);
  res.json(studentGrades);
});

app.get('/parent/children/:studentId/attendance', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'غير مصرح' });
  }
  
  const student = students.find(s => s._id === req.params.studentId && s.parent.id === req.session.user.id);
  
  if (!student) {
    return res.status(404).json({ message: 'لم يتم العثور على الطالب' });
  }
  
  res.json(student.attendance);
});

// Serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));