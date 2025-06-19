// DOM Elements
const app = document.getElementById('app');
const mainContent = document.getElementById('main-content');
const sections = document.querySelectorAll('.section');
const navMenu = document.getElementById('nav-menu');
const homeLink = document.getElementById('home-link');
const loginLink = document.getElementById('login-link');
const loginForm = document.getElementById('login-form');

// Dashboard sections
const dashboardBtns = document.querySelectorAll('.dashboard-btn');
const dashboardSections = document.querySelectorAll('.dashboard-section');

// Authentication state
let currentUser = null;

// Initialize application
function init() {
  // Check if user is logged in
  checkAuthStatus();
  
  // Set up event listeners
  setupEventListeners();
}

// Check authentication status
async function checkAuthStatus() {
  try {
    const response = await fetch('/auth/check');
    
    if (response.ok) {
      currentUser = await response.json();
      updateUIForAuthenticatedUser();
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
  }
}

// Update UI based on authentication status
function updateUIForAuthenticatedUser() {
  if (currentUser) {
    // Update navigation
    loginLink.textContent = 'تسجيل الخروج';
    loginLink.id = 'logout-link';
    
    // Add dashboard link to navigation
    const dashboardLi = document.createElement('li');
    const dashboardLink = document.createElement('a');
    dashboardLink.textContent = 'لوحة التحكم';
    dashboardLink.href = '#';
    dashboardLink.id = 'dashboard-link';
    dashboardLi.appendChild(dashboardLink);
    navMenu.insertBefore(dashboardLi, document.getElementById('logout-link').parentElement);
    
    // Show appropriate dashboard based on user role
    showDashboardForRole(currentUser.role);
  }
}

// Show dashboard based on user role
function showDashboardForRole(role) {
  hideAllSections();
  
  switch (role) {
    case 'admin':
      document.getElementById('admin-dashboard').classList.add('active');
      loadUsers();
      break;
    case 'teacher':
      document.getElementById('teacher-dashboard').classList.add('active');
      loadStudents();
      break;
    case 'student':
      document.getElementById('student-dashboard').classList.add('active');
      loadStudentProfile();
      loadStudentGrades();
      loadStudentAttendance();
      break;
    case 'parent':
      document.getElementById('parent-dashboard').classList.add('active');
      loadChildren();
      break;
    default:
      document.getElementById('home-section').classList.add('active');
  }
}

// Set up event listeners
function setupEventListeners() {
  // Navigation links
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home-section');
    updateActiveNavLink(homeLink);
  });
  
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login-section');
    updateActiveNavLink(loginLink);
  });
  
  // Handle navigation clicks dynamically
  navMenu.addEventListener('click', (e) => {
    if (e.target.id === 'dashboard-link') {
      e.preventDefault();
      showDashboardForRole(currentUser.role);
      updateActiveNavLink(e.target);
    } else if (e.target.id === 'logout-link') {
      e.preventDefault();
      logout();
    }
  });
  
  // Login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
  });
  
  // Dashboard tab navigation
  dashboardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      
      // Update active button
      dashboardBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show corresponding section
      dashboardSections.forEach(s => s.classList.remove('active'));
      document.getElementById(section).classList.add('active');
    });
  });
  
  // Admin specific event listeners
  setupAdminEventListeners();
  
  // Teacher specific event listeners
  setupTeacherEventListeners();
  
  // Parent specific event listeners
  setupParentEventListeners();
}

// Admin event listeners
function setupAdminEventListeners() {
  const addUserBtn = document.getElementById('add-user-btn');
  const addUserModal = document.getElementById('add-user-modal');
  const closeBtn = document.querySelector('.close');
  const addUserForm = document.getElementById('add-user-form');
  const newRoleSelect = document.getElementById('new-role');
  const studentFields = document.getElementById('student-fields');
  
  if (addUserBtn) {
    // Open modal
    addUserBtn.addEventListener('click', () => {
      addUserModal.style.display = 'block';
      // Load parents for student selection
      loadParentsForSelect();
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
      addUserModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === addUserModal) {
        addUserModal.style.display = 'none';
      }
    });
    
    // Show/hide student fields based on role selection
    newRoleSelect.addEventListener('change', () => {
      if (newRoleSelect.value === 'student') {
        studentFields.classList.remove('hidden');
      } else {
        studentFields.classList.add('hidden');
      }
    });
    
    // Add user form submission
    addUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addUser();
    });
    
    // Filter users
    const filterUsers = document.getElementById('filter-users');
    filterUsers.addEventListener('change', () => {
      loadUsers(filterUsers.value);
    });
  }
}

// Teacher event listeners
function setupTeacherEventListeners() {
  const saveAttendanceBtn = document.getElementById('save-attendance-btn');
  const addGradeBtn = document.getElementById('add-grade-btn');
  const newMessageBtn = document.getElementById('new-message-btn');
  
  if (saveAttendanceBtn) {
    saveAttendanceBtn.addEventListener('click', saveAttendance);
  }
  
  if (addGradeBtn) {
    addGradeBtn.addEventListener('click', () => {
      // Show add grade modal
      console.log('Add grade clicked');
    });
  }
  
  if (newMessageBtn) {
    newMessageBtn.addEventListener('click', () => {
      // Show new message modal
      console.log('New message clicked');
    });
  }
}

// Parent event listeners
function setupParentEventListeners() {
  const parentNewMessageBtn = document.getElementById('parent-new-message-btn');
  
  if (parentNewMessageBtn) {
    parentNewMessageBtn.addEventListener('click', () => {
      // Show new message modal for parent
      console.log('Parent new message clicked');
    });
  }
  
  // Child selection event delegation
  const childrenList = document.getElementById('children-list');
  if (childrenList) {
    childrenList.addEventListener('click', (e) => {
      const childCard = e.target.closest('.child-card');
      if (childCard) {
        const studentId = childCard.getAttribute('data-id');
        selectChild(studentId);
      }
    });
  }
  
  // Tab navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show corresponding tab content
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(tab).classList.add('active');
    });
  });
}

// Login function
async function login() {
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      currentUser = await response.json();
      updateUIForAuthenticatedUser();
      showDashboardForRole(currentUser.role);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('حدث خطأ أثناء تسجيل الدخول');
  }
}

// Logout function
async function logout() {
  try {
    await fetch('/auth/logout');
    currentUser = null;
    window.location.reload();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Admin Functions
async function loadUsers(role = 'all') {
  try {
    const response = await fetch('/admin/users');
    
    if (response.ok) {
      const users = await response.json();
      const usersTableBody = document.getElementById('users-table-body');
      usersTableBody.innerHTML = '';
      
      const filteredUsers = role === 'all' ? users : users.filter(user => user.role === role);
      
      filteredUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${translateRole(user.role)}</td>
          <td>
            <button class="btn-edit" data-id="${user._id}">تعديل</button>
            <button class="btn-delete" data-id="${user._id}">حذف</button>
          </td>
        `;
        usersTableBody.appendChild(tr);
      });
      
      // Add event listeners to edit and delete buttons
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editUser(btn.getAttribute('data-id')));
      });
      
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteUser(btn.getAttribute('data-id')));
      });
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function loadParentsForSelect() {
  try {
    const response = await fetch('/admin/users');
    
    if (response.ok) {
      const users = await response.json();
      const parentSelect = document.getElementById('parent');
      parentSelect.innerHTML = '<option value="">-- اختر ولي الأمر --</option>';
      
      const parents = users.filter(user => user.role === 'parent');
      
      parents.forEach(parent => {
        const option = document.createElement('option');
        option.value = parent._id;
        option.textContent = parent.name;
        parentSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error loading parents:', error);
  }
}

async function addUser() {
  try {
    const formData = new FormData(document.getElementById('add-user-form'));
    const userData = Object.fromEntries(formData.entries());
    
    const response = await fetch('/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      document.getElementById('add-user-modal').style.display = 'none';
      document.getElementById('add-user-form').reset();
      loadUsers();
      alert('تم إضافة المستخدم بنجاح');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    alert('حدث خطأ أثناء إضافة المستخدم');
  }
}

function editUser(userId) {
  console.log('Edit user:', userId);
  // Implement edit user functionality
}

async function deleteUser(userId) {
  if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
    try {
      const response = await fetch(`/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadUsers();
        alert('تم حذف المستخدم بنجاح');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('حدث خطأ أثناء حذف المستخدم');
    }
  }
}

// Teacher Functions
async function loadStudents() {
  try {
    const response = await fetch('/teacher/students');
    
    if (response.ok) {
      const students = await response.json();
      const studentsTableBody = document.getElementById('students-table-body');
      studentsTableBody.innerHTML = '';
      
      students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${student.user.name}</td>
          <td>${student.grade}</td>
          <td>${student.classroom}</td>
          <td>
            <button class="btn-view-grades" data-id="${student._id}">الدرجات</button>
            <button class="btn-view-attendance" data-id="${student._id}">الحضور</button>
            <button class="btn-message-parent" data-id="${student.parent}">مراسلة ولي الأمر</button>
          </td>
        `;
        studentsTableBody.appendChild(tr);
      });
      
      // Load classrooms for attendance section
      const classrooms = [...new Set(students.map(s => s.classroom))];
      const classroomSelect = document.getElementById('attendance-class');
      classroomSelect.innerHTML = '';
      
      classrooms.forEach(classroom => {
        const option = document.createElement('option');
        option.value = classroom;
        option.textContent = classroom;
        classroomSelect.appendChild(option);
      });
      
      // Add event listeners
      document.querySelectorAll('.btn-view-grades').forEach(btn => {
        btn.addEventListener('click', () => viewStudentGrades(btn.getAttribute('data-id')));
      });
      
      document.querySelectorAll('.btn-view-attendance').forEach(btn => {
        btn.addEventListener('click', () => viewStudentAttendance(btn.getAttribute('data-id')));
      });
      
      document.querySelectorAll('.btn-message-parent').forEach(btn => {
        btn.addEventListener('click', () => messageParent(btn.getAttribute('data-id')));
      });
      
      // Add change event for classroom select
      classroomSelect.addEventListener('change', loadClassroomStudents);
    }
  } catch (error) {
    console.error('Error loading students:', error);
  }
}

function loadClassroomStudents() {
  console.log('Load students for classroom');
  // Implement loading students for attendance by classroom
}

function viewStudentGrades(studentId) {
  console.log('View grades for student:', studentId);
  // Implement viewing student grades
}

function viewStudentAttendance(studentId) {
  console.log('View attendance for student:', studentId);
  // Implement viewing student attendance
}

function messageParent(parentId) {
  console.log('Message parent:', parentId);
  // Implement messaging parent
}

function saveAttendance() {
  console.log('Save attendance');
  // Implement saving attendance
}

// Student Functions
async function loadStudentProfile() {
  try {
    const response = await fetch('/student/profile');
    
    if (response.ok) {
      const student = await response.json();
      const studentProfile = document.getElementById('student-profile');
      
      studentProfile.innerHTML = `
        <div class="profile-info"><strong>الاسم:</strong> ${student.user.name}</div>
        <div class="profile-info"><strong>البريد الإلكتروني:</strong> ${student.user.email}</div>
        <div class="profile-info"><strong>الصف:</strong> ${student.grade}</div>
        <div class="profile-info"><strong>الفصل:</strong> ${student.classroom}</div>
        <div class="profile-info"><strong>ولي الأمر:</strong> ${student.parent ? student.parent.name : 'غير مسجل'}</div>
      `;
    }
  } catch (error) {
    console.error('Error loading student profile:', error);
  }
}

async function loadStudentGrades() {
  try {
    const response = await fetch('/student/grades');
    
    if (response.ok) {
      const grades = await response.json();
      const gradesTableBody = document.getElementById('student-grades-table-body');
      gradesTableBody.innerHTML = '';
      
      grades.forEach(grade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${grade.subject}</td>
          <td>${translateGradeType(grade.type)}</td>
          <td>${grade.score}</td>
          <td>${grade.maxScore}</td>
          <td>${Math.round((grade.score / grade.maxScore) * 100)}%</td>
          <td>${formatDate(grade.date)}</td>
          <td>${grade.notes || '-'}</td>
        `;
        gradesTableBody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error('Error loading student grades:', error);
  }
}

async function loadStudentAttendance() {
  try {
    const response = await fetch('/student/attendance');
    
    if (response.ok) {
      const attendance = await response.json();
      const attendanceTableBody = document.getElementById('student-attendance-table-body');
      attendanceTableBody.innerHTML = '';
      
      attendance.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDate(record.date)}</td>
          <td>${translateAttendanceStatus(record.status)}</td>
          <td>${record.notes || '-'}</td>
        `;
        attendanceTableBody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error('Error loading student attendance:', error);
  }
}

// Parent Functions
async function loadChildren() {
  try {
    const response = await fetch('/parent/children');
    
    if (response.ok) {
      const children = await response.json();
      const childrenList = document.getElementById('children-list');
      childrenList.innerHTML = '';
      
      children.forEach(child => {
        const div = document.createElement('div');
        div.className = 'child-card';
        div.setAttribute('data-id', child._id);
        div.innerHTML = `
          <h4>${child.user.name}</h4>
          <div>الصف: ${child.grade}</div>
          <div>الفصل: ${child.classroom}</div>
        `;
        childrenList.appendChild(div);
      });
      
      // If there are children, select the first one by default
      if (children.length > 0) {
        selectChild(children[0]._id);
      }
    }
  } catch (error) {
    console.error('Error loading children:', error);
  }
}

async function selectChild(studentId) {
  try {
    // Mark selected child card as active
    document.querySelectorAll('.child-card').forEach(card => {
      card.classList.remove('active');
      if (card.getAttribute('data-id') === studentId) {
        card.classList.add('active');
      }
    });
    
    document.getElementById('child-details').classList.remove('hidden');
    
    // Load child name
    const selectedCard = document.querySelector(`.child-card[data-id="${studentId}"]`);
    document.getElementById('child-name').textContent = selectedCard.querySelector('h4').textContent;
    
    // Load grades
    const gradesResponse = await fetch(`/parent/children/${studentId}/grades`);
    
    if (gradesResponse.ok) {
      const grades = await gradesResponse.json();
      const gradesTableBody = document.getElementById('child-grades-table-body');
      gradesTableBody.innerHTML = '';
      
      grades.forEach(grade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${grade.subject}</td>
          <td>${translateGradeType(grade.type)}</td>
          <td>${grade.score}</td>
          <td>${grade.maxScore}</td>
          <td>${Math.round((grade.score / grade.maxScore) * 100)}%</td>
          <td>${formatDate(grade.date)}</td>
          <td>${grade.notes || '-'}</td>
        `;
        gradesTableBody.appendChild(tr);
      });
    }
    
    // Load attendance
    const attendanceResponse = await fetch(`/parent/children/${studentId}/attendance`);
    
    if (attendanceResponse.ok) {
      const attendance = await attendanceResponse.json();
      const attendanceTableBody = document.getElementById('child-attendance-table-body');
      attendanceTableBody.innerHTML = '';
      
      attendance.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDate(record.date)}</td>
          <td>${translateAttendanceStatus(record.status)}</td>
          <td>${record.notes || '-'}</td>
        `;
        attendanceTableBody.appendChild(tr);
      });
    }
  } catch (error) {
    console.error('Error selecting child:', error);
  }
}

// Helper Functions
function showSection(sectionId) {
  hideAllSections();
  document.getElementById(sectionId).classList.add('active');
}

function hideAllSections() {
  sections.forEach(section => section.classList.remove('active'));
}

function updateActiveNavLink(activeLink) {
  document.querySelectorAll('#main-nav a').forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

function translateRole(role) {
  const roles = {
    admin: 'مدير',
    teacher: 'معلم',
    student: 'طالب',
    parent: 'ولي أمر'
  };
  
  return roles[role] || role;
}

function translateGradeType(type) {
  const types = {
    quiz: 'اختبار قصير',
    homework: 'واجب منزلي',
    exam: 'اختبار',
    project: 'مشروع',
    midterm: 'نصفي',
    final: 'نهائي'
  };
  
  return types[type] || type;
}

function translateAttendanceStatus(status) {
  const statuses = {
    present: 'حاضر',
    absent: 'غائب',
    late: 'متأخر',
    excused: 'غياب بعذر'
  };
  
  return statuses[status] || status;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);