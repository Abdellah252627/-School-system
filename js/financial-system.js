// نظام المحاسبة والمالية المتكامل مع Excel

class FinancialSystem {
  constructor() {
    this.students = [];
    this.payments = [];
    this.expenses = [];
    this.feeStructure = [];
    this.reports = [];
    this.excelData = [];
    this.init();
  }

  init() {
    this.loadData();
    this.setupExcelIntegration();
    this.initializeFeeStructure();
    this.loadSampleData();
  }

  // تحميل البيانات المحفوظة
  loadData() {
    const savedStudents = localStorage.getItem('financial_students');
    const savedPayments = localStorage.getItem('financial_payments');
    const savedExpenses = localStorage.getItem('financial_expenses');
    const savedFees = localStorage.getItem('fee_structure');

    if (savedStudents) this.students = JSON.parse(savedStudents);
    if (savedPayments) this.payments = JSON.parse(savedPayments);
    if (savedExpenses) this.expenses = JSON.parse(savedExpenses);
    if (savedFees) this.feeStructure = JSON.parse(savedFees);
  }

  // حفظ البيانات
  saveData() {
    localStorage.setItem('financial_students', JSON.stringify(this.students));
    localStorage.setItem('financial_payments', JSON.stringify(this.payments));
    localStorage.setItem('financial_expenses', JSON.stringify(this.expenses));
    localStorage.setItem('fee_structure', JSON.stringify(this.feeStructure));
  }

  // إعداد التكامل مع Excel
  setupExcelIntegration() {
    // إعداد مكتبة SheetJS للتعامل مع Excel
    this.excelConfig = {
      supportedFormats: ['.xlsx', '.xls', '.csv'],
      maxFileSize: 10 * 1024 * 1024, // 10MB
      encoding: 'utf-8'
    };
  }

  // تهيئة هيكل الرسوم
  initializeFeeStructure() {
    if (this.feeStructure.length === 0) {
      this.feeStructure = [
        {
          id: 'tuition_9',
          name: 'رسوم دراسية - الصف التاسع',
          grade: '9',
          amount: 5000,
          type: 'tuition',
          frequency: 'annual',
          dueDate: '2024-09-01',
          description: 'الرسوم الدراسية السنوية للصف التاسع'
        },
        {
          id: 'tuition_10',
          name: 'رسوم دراسية - الصف العاشر',
          grade: '10',
          amount: 5500,
          type: 'tuition',
          frequency: 'annual',
          dueDate: '2024-09-01',
          description: 'الرسوم الدراسية السنوية للصف العاشر'
        },
        {
          id: 'books_fee',
          name: 'رسوم الكتب',
          grade: 'all',
          amount: 300,
          type: 'books',
          frequency: 'annual',
          dueDate: '2024-08-15',
          description: 'رسوم الكتب المدرسية'
        },
        {
          id: 'transport_fee',
          name: 'رسوم النقل',
          grade: 'all',
          amount: 200,
          type: 'transport',
          frequency: 'monthly',
          dueDate: '2024-01-01',
          description: 'رسوم النقل الشهرية'
        },
        {
          id: 'activity_fee',
          name: 'رسوم الأنشطة',
          grade: 'all',
          amount: 150,
          type: 'activities',
          frequency: 'semester',
          dueDate: '2024-09-01',
          description: 'رسوم الأنشطة اللاصفية'
        }
      ];
      this.saveData();
    }
  }

  // تحميل بيانات تجريبية
  loadSampleData() {
    if (this.students.length === 0) {
      this.students = [
        {
          id: 'student1',
          name: 'علي أحمد محمد',
          grade: '9',
          classroom: '9أ',
          parentName: 'أحمد محمد',
          parentPhone: '0501234567',
          parentEmail: 'ahmed@email.com',
          enrollmentDate: '2024-09-01',
          status: 'active',
          totalFees: 5650,
          paidAmount: 3000,
          remainingAmount: 2650,
          paymentHistory: []
        },
        {
          id: 'student2',
          name: 'سارة خالد علي',
          grade: '10',
          classroom: '10ب',
          parentName: 'خالد علي',
          parentPhone: '0507654321',
          parentEmail: 'khalid@email.com',
          enrollmentDate: '2024-09-01',
          status: 'active',
          totalFees: 5950,
          paidAmount: 5950,
          remainingAmount: 0,
          paymentHistory: []
        },
        {
          id: 'student3',
          name: 'محمد عبدالله',
          grade: '9',
          classroom: '9ب',
          parentName: 'عبدالله محمد',
          parentPhone: '0509876543',
          parentEmail: 'abdullah@email.com',
          enrollmentDate: '2024-09-01',
          status: 'active',
          totalFees: 5650,
          paidAmount: 1000,
          remainingAmount: 4650,
          paymentHistory: []
        }
      ];

      // إضافة بعض المدفوعات التجريبية
      this.payments = [
        {
          id: 'pay_001',
          studentId: 'student1',
          studentName: 'علي أحمد محمد',
          amount: 3000,
          feeType: 'tuition',
          paymentMethod: 'bank_transfer',
          paymentDate: '2024-09-15',
          receiptNumber: 'REC-001',
          notes: 'دفعة أولى من الرسوم الدراسية',
          status: 'completed'
        },
        {
          id: 'pay_002',
          studentId: 'student2',
          studentName: 'سارة خالد علي',
          amount: 5950,
          feeType: 'full_payment',
          paymentMethod: 'cash',
          paymentDate: '2024-09-01',
          receiptNumber: 'REC-002',
          notes: 'دفع كامل للرسوم السنوية',
          status: 'completed'
        },
        {
          id: 'pay_003',
          studentId: 'student3',
          studentName: 'محمد عبدالله',
          amount: 1000,
          feeType: 'tuition',
          paymentMethod: 'credit_card',
          paymentDate: '2024-09-10',
          receiptNumber: 'REC-003',
          notes: 'دفعة جزئية',
          status: 'completed'
        }
      ];

      // إضافة بعض المصروفات التجريبية
      this.expenses = [
        {
          id: 'exp_001',
          category: 'salaries',
          description: 'رواتب المعلمين - سبتمبر',
          amount: 45000,
          date: '2024-09-30',
          paymentMethod: 'bank_transfer',
          vendor: 'قسم الموارد البشرية',
          status: 'paid',
          receiptNumber: 'EXP-001'
        },
        {
          id: 'exp_002',
          category: 'utilities',
          description: 'فاتورة الكهرباء',
          amount: 2500,
          date: '2024-09-25',
          paymentMethod: 'bank_transfer',
          vendor: 'شركة الكهرباء',
          status: 'paid',
          receiptNumber: 'EXP-002'
        },
        {
          id: 'exp_003',
          category: 'supplies',
          description: 'مستلزمات مكتبية',
          amount: 800,
          date: '2024-09-20',
          paymentMethod: 'cash',
          vendor: 'مكتبة الأمل',
          status: 'paid',
          receiptNumber: 'EXP-003'
        }
      ];

      this.saveData();
    }
  }

  // إضافة طالب جديد
  addStudent(studentData) {
    const student = {
      id: this.generateId('student'),
      ...studentData,
      enrollmentDate: studentData.enrollmentDate || new Date().toISOString().split('T')[0],
      status: 'active',
      totalFees: this.calculateTotalFees(studentData.grade),
      paidAmount: 0,
      remainingAmount: this.calculateTotalFees(studentData.grade),
      paymentHistory: []
    };

    this.students.push(student);
    this.saveData();
    return student;
  }

  // حساب إجمالي الرسوم للطالب
  calculateTotalFees(grade) {
    return this.feeStructure
      .filter(fee => fee.grade === grade || fee.grade === 'all')
      .reduce((total, fee) => {
        if (fee.frequency === 'annual') return total + fee.amount;
        if (fee.frequency === 'semester') return total + (fee.amount * 2);
        if (fee.frequency === 'monthly') return total + (fee.amount * 10); // 10 أشهر دراسية
        return total;
      }, 0);
  }

  // تسجيل دفعة جديدة
  recordPayment(paymentData) {
    const payment = {
      id: this.generateId('pay'),
      ...paymentData,
      paymentDate: paymentData.paymentDate || new Date().toISOString().split('T')[0],
      receiptNumber: paymentData.receiptNumber || this.generateReceiptNumber(),
      status: 'completed'
    };

    this.payments.push(payment);

    // تحديث بيانات الطالب
    const student = this.students.find(s => s.id === payment.studentId);
    if (student) {
      student.paidAmount += payment.amount;
      student.remainingAmount = student.totalFees - student.paidAmount;
      student.paymentHistory.push(payment.id);
    }

    this.saveData();
    return payment;
  }

  // تسجيل مصروف جديد
  recordExpense(expenseData) {
    const expense = {
      id: this.generateId('exp'),
      ...expenseData,
      date: expenseData.date || new Date().toISOString().split('T')[0],
      receiptNumber: expenseData.receiptNumber || this.generateReceiptNumber('EXP'),
      status: 'paid'
    };

    this.expenses.push(expense);
    this.saveData();
    return expense;
  }

  // استيراد بيانات من Excel
  async importFromExcel(file) {
    return new Promise((resolve, reject) => {
      if (!this.validateExcelFile(file)) {
        reject(new Error('نوع الملف غير مدعوم'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const result = this.processExcelWorkbook(workbook);
          resolve(result);
        } catch (error) {
          reject(new Error('خطأ في قراءة ملف Excel: ' + error.message));
        }
      };

      reader.onerror = () => reject(new Error('خطأ في قراءة الملف'));
      reader.readAsArrayBuffer(file);
    });
  }

  // التحقق من صحة ملف Excel
  validateExcelFile(file) {
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    return validExtensions.includes(fileExtension) && 
           file.size <= this.excelConfig.maxFileSize;
  }

  // معالجة ملف Excel
  processExcelWorkbook(workbook) {
    const result = {
      students: [],
      payments: [],
      expenses: [],
      errors: []
    };

    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (sheetName.toLowerCase().includes('student') || sheetName.toLowerCase().includes('طالب')) {
        result.students = this.processStudentData(jsonData);
      } else if (sheetName.toLowerCase().includes('payment') || sheetName.toLowerCase().includes('دفع')) {
        result.payments = this.processPaymentData(jsonData);
      } else if (sheetName.toLowerCase().includes('expense') || sheetName.toLowerCase().includes('مصروف')) {
        result.expenses = this.processExpenseData(jsonData);
      }
    });

    return result;
  }

  // معالجة بيانات الطلاب من Excel
  processStudentData(data) {
    const students = [];
    const errors = [];

    data.forEach((row, index) => {
      try {
        const student = {
          name: row['اسم الطالب'] || row['Student Name'] || row.name,
          grade: row['الصف'] || row['Grade'] || row.grade,
          classroom: row['الفصل'] || row['Classroom'] || row.classroom,
          parentName: row['ولي الأمر'] || row['Parent Name'] || row.parentName,
          parentPhone: row['رقم الهاتف'] || row['Phone'] || row.phone,
          parentEmail: row['البريد الإلكتروني'] || row['Email'] || row.email
        };

        if (student.name && student.grade) {
          students.push(student);
        } else {
          errors.push(`الصف ${index + 2}: بيانات ناقصة`);
        }
      } catch (error) {
        errors.push(`الصف ${index + 2}: ${error.message}`);
      }
    });

    return { students, errors };
  }

  // معالجة بيانات المدفوعات من Excel
  processPaymentData(data) {
    const payments = [];
    const errors = [];

    data.forEach((row, index) => {
      try {
        const payment = {
          studentName: row['اسم الطالب'] || row['Student Name'] || row.studentName,
          amount: parseFloat(row['المبلغ'] || row['Amount'] || row.amount),
          feeType: row['نوع الرسوم'] || row['Fee Type'] || row.feeType,
          paymentMethod: row['طريقة الدفع'] || row['Payment Method'] || row.paymentMethod,
          paymentDate: row['تاريخ الدفع'] || row['Payment Date'] || row.paymentDate,
          notes: row['ملاحظات'] || row['Notes'] || row.notes || ''
        };

        if (payment.studentName && payment.amount && !isNaN(payment.amount)) {
          payments.push(payment);
        } else {
          errors.push(`الصف ${index + 2}: بيانات دفع غير صحيحة`);
        }
      } catch (error) {
        errors.push(`الصف ${index + 2}: ${error.message}`);
      }
    });

    return { payments, errors };
  }

  // معالجة بيانات المصروفات من Excel
  processExpenseData(data) {
    const expenses = [];
    const errors = [];

    data.forEach((row, index) => {
      try {
        const expense = {
          category: row['الفئة'] || row['Category'] || row.category,
          description: row['الوصف'] || row['Description'] || row.description,
          amount: parseFloat(row['المبلغ'] || row['Amount'] || row.amount),
          date: row['التاريخ'] || row['Date'] || row.date,
          vendor: row['المورد'] || row['Vendor'] || row.vendor,
          paymentMethod: row['طريقة الدفع'] || row['Payment Method'] || row.paymentMethod
        };

        if (expense.description && expense.amount && !isNaN(expense.amount)) {
          expenses.push(expense);
        } else {
          errors.push(`الصف ${index + 2}: بيانات مصروف غير صحيحة`);
        }
      } catch (error) {
        errors.push(`الصف ${index + 2}: ${error.message}`);
      }
    });

    return { expenses, errors };
  }

  // تصدير البيانات إلى Excel
  exportToExcel(dataType = 'all', filters = {}) {
    const workbook = XLSX.utils.book_new();

    if (dataType === 'all' || dataType === 'students') {
      const studentsData = this.prepareStudentsForExport(filters);
      const studentsSheet = XLSX.utils.json_to_sheet(studentsData);
      XLSX.utils.book_append_sheet(workbook, studentsSheet, 'الطلاب');
    }

    if (dataType === 'all' || dataType === 'payments') {
      const paymentsData = this.preparePaymentsForExport(filters);
      const paymentsSheet = XLSX.utils.json_to_sheet(paymentsData);
      XLSX.utils.book_append_sheet(workbook, paymentsSheet, 'المدفوعات');
    }

    if (dataType === 'all' || dataType === 'expenses') {
      const expensesData = this.prepareExpensesForExport(filters);
      const expensesSheet = XLSX.utils.json_to_sheet(expensesData);
      XLSX.utils.book_append_sheet(workbook, expensesSheet, 'المصروفات');
    }

    if (dataType === 'all' || dataType === 'summary') {
      const summaryData = this.prepareSummaryForExport(filters);
      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'ملخص مالي');
    }

    // تنزيل الملف
    const fileName = `تقرير_مالي_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    return fileName;
  }

  // تحضير بيانات الطلاب للتصدير
  prepareStudentsForExport(filters = {}) {
    let students = [...this.students];

    // تطبيق الفلاتر
    if (filters.grade) {
      students = students.filter(s => s.grade === filters.grade);
    }
    if (filters.status) {
      students = students.filter(s => s.status === filters.status);
    }

    return students.map(student => ({
      'رقم الطالب': student.id,
      'اسم الطالب': student.name,
      'الصف': student.grade,
      'الفصل': student.classroom,
      'ولي الأمر': student.parentName,
      'رقم الهاتف': student.parentPhone,
      'البريد الإلكتروني': student.parentEmail,
      'تاريخ التسجيل': student.enrollmentDate,
      'الحالة': student.status === 'active' ? 'نشط' : 'غير نشط',
      'إجمالي الرسوم': student.totalFees,
      'المبلغ المدفوع': student.paidAmount,
      'المبلغ المتبقي': student.remainingAmount,
      'نسبة السداد': `${((student.paidAmount / student.totalFees) * 100).toFixed(1)}%`
    }));
  }

  // تحضير بيانات المدفوعات للتصدير
  preparePaymentsForExport(filters = {}) {
    let payments = [...this.payments];

    // تطبيق الفلاتر
    if (filters.dateFrom) {
      payments = payments.filter(p => p.paymentDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      payments = payments.filter(p => p.paymentDate <= filters.dateTo);
    }
    if (filters.paymentMethod) {
      payments = payments.filter(p => p.paymentMethod === filters.paymentMethod);
    }

    return payments.map(payment => ({
      'رقم الإيصال': payment.receiptNumber,
      'اسم الطالب': payment.studentName,
      'المبلغ': payment.amount,
      'نوع الرسوم': this.getFeeTypeName(payment.feeType),
      'طريقة الدفع': this.getPaymentMethodName(payment.paymentMethod),
      'تاريخ الدفع': payment.paymentDate,
      'ملاحظات': payment.notes || '',
      'الحالة': payment.status === 'completed' ? 'مكتمل' : 'معلق'
    }));
  }

  // تحضير بيانات المصروفات للتصدير
  prepareExpensesForExport(filters = {}) {
    let expenses = [...this.expenses];

    // تطبيق الفلاتر
    if (filters.category) {
      expenses = expenses.filter(e => e.category === filters.category);
    }
    if (filters.dateFrom) {
      expenses = expenses.filter(e => e.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      expenses = expenses.filter(e => e.date <= filters.dateTo);
    }

    return expenses.map(expense => ({
      'رقم المصروف': expense.id,
      'الفئة': this.getExpenseCategoryName(expense.category),
      'الوصف': expense.description,
      'المبلغ': expense.amount,
      'التاريخ': expense.date,
      'المورد': expense.vendor || '',
      'طريقة الدفع': this.getPaymentMethodName(expense.paymentMethod),
      'رقم الإيصال': expense.receiptNumber,
      'الحالة': expense.status === 'paid' ? 'مدفوع' : 'معلق'
    }));
  }

  // تحضير الملخص المالي للتصدير
  prepareSummaryForExport(filters = {}) {
    const summary = this.generateFinancialSummary(filters);
    
    return [
      { 'البيان': 'إجمالي الإيرادات', 'المبلغ': summary.totalRevenue },
      { 'البيان': 'إجمالي المصروفات', 'المبلغ': summary.totalExpenses },
      { 'البيان': 'صافي الربح/الخسارة', 'المبلغ': summary.netProfit },
      { 'البيان': 'عدد الطلاب', 'المبلغ': summary.totalStudents },
      { 'البيان': 'عدد المدفوعات', 'المبلغ': summary.totalPayments },
      { 'البيان': 'متوسط الدفع', 'المبلغ': summary.averagePayment },
      { 'البيان': 'نسبة التحصيل', 'المبلغ': `${summary.collectionRate}%` }
    ];
  }

  // إنشاء تقرير مالي شامل
  generateFinancialSummary(filters = {}) {
    const totalRevenue = this.payments
      .filter(p => this.applyDateFilter(p.paymentDate, filters))
      .reduce((sum, p) => sum + p.amount, 0);

    const totalExpenses = this.expenses
      .filter(e => this.applyDateFilter(e.date, filters))
      .reduce((sum, e) => sum + e.amount, 0);

    const totalStudents = this.students.filter(s => s.status === 'active').length;
    const totalPayments = this.payments.length;
    const averagePayment = totalPayments > 0 ? totalRevenue / totalPayments : 0;

    const totalExpectedRevenue = this.students
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.totalFees, 0);

    const collectionRate = totalExpectedRevenue > 0 ? 
      ((totalRevenue / totalExpectedRevenue) * 100).toFixed(1) : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      totalStudents,
      totalPayments,
      averagePayment: Math.round(averagePayment),
      collectionRate: parseFloat(collectionRate)
    };
  }

  // تطبيق فلتر التاريخ
  applyDateFilter(date, filters) {
    if (filters.dateFrom && date < filters.dateFrom) return false;
    if (filters.dateTo && date > filters.dateTo) return false;
    return true;
  }

  // الحصول على اسم نوع الرسوم
  getFeeTypeName(type) {
    const types = {
      tuition: 'رسوم دراسية',
      books: 'رسوم الكتب',
      transport: 'رسوم النقل',
      activities: 'رسوم الأنشطة',
      full_payment: 'دفع كامل'
    };
    return types[type] || type;
  }

  // الحصول على اسم طريقة الدفع
  getPaymentMethodName(method) {
    const methods = {
      cash: 'نقداً',
      bank_transfer: 'تحويل بنكي',
      credit_card: 'بطاقة ائتمان',
      check: 'شيك'
    };
    return methods[method] || method;
  }

  // الحصول على اسم فئة المصروف
  getExpenseCategoryName(category) {
    const categories = {
      salaries: 'الرواتب',
      utilities: 'المرافق',
      supplies: 'المستلزمات',
      maintenance: 'الصيانة',
      marketing: 'التسويق',
      other: 'أخرى'
    };
    return categories[category] || category;
  }

  // البحث في البيانات المالية
  searchFinancialData(query, type = 'all') {
    const results = {
      students: [],
      payments: [],
      expenses: []
    };

    const searchTerm = query.toLowerCase();

    if (type === 'all' || type === 'students') {
      results.students = this.students.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.parentName.toLowerCase().includes(searchTerm) ||
        student.parentPhone.includes(searchTerm) ||
        student.classroom.toLowerCase().includes(searchTerm)
      );
    }

    if (type === 'all' || type === 'payments') {
      results.payments = this.payments.filter(payment =>
        payment.studentName.toLowerCase().includes(searchTerm) ||
        payment.receiptNumber.toLowerCase().includes(searchTerm) ||
        payment.notes.toLowerCase().includes(searchTerm)
      );
    }

    if (type === 'all' || type === 'expenses') {
      results.expenses = this.expenses.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm) ||
        expense.vendor.toLowerCase().includes(searchTerm) ||
        expense.category.toLowerCase().includes(searchTerm)
      );
    }

    return results;
  }

  // إنشاء معرف فريد
  generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // إنشاء رقم إيصال
  generateReceiptNumber(prefix = 'REC') {
    const count = this.payments.length + this.expenses.length + 1;
    return `${prefix}-${String(count).padStart(4, '0')}`;
  }

  // الحصول على إحصائيات سريعة
  getQuickStats() {
    const totalStudents = this.students.filter(s => s.status === 'active').length;
    const totalRevenue = this.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalExpenses = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    const pendingPayments = this.students.reduce((sum, s) => sum + s.remainingAmount, 0);

    return {
      totalStudents,
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      pendingPayments,
      collectionRate: this.calculateOverallCollectionRate()
    };
  }

  // حساب معدل التحصيل الإجمالي
  calculateOverallCollectionRate() {
    const totalExpected = this.students.reduce((sum, s) => sum + s.totalFees, 0);
    const totalCollected = this.students.reduce((sum, s) => sum + s.paidAmount, 0);
    
    return totalExpected > 0 ? ((totalCollected / totalExpected) * 100).toFixed(1) : 0;
  }
}

// إنشاء مثيل عام للنظام المالي
window.financialSystem = new FinancialSystem();

// تصدير النظام
window.FinancialSystem = FinancialSystem;