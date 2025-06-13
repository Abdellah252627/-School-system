// نظام الشؤون المالية والمحاسبة

// هيكل بيانات نظام الشؤون المالية (بيانات محاكاة)
const financeData = {
  // الرسوم الدراسية
  tuitionFees: [
    {
      id: "tf1",
      name: "الرسوم الدراسية الأساسية",
      grade: "9", // الصف التاسع
      schoolYear: "2023-2024",
      amount: 15000,
      currency: "ريال",
      description: "الرسوم الدراسية الأساسية للفصلين الدراسيين",
      dueDate: "2023-09-15",
      isActive: true
    },
    {
      id: "tf2",
      name: "رسوم الأنشطة",
      grade: "9", // الصف التاسع
      schoolYear: "2023-2024",
      amount: 1200,
      currency: "ريال",
      description: "رسوم الأنشطة الإضافية والرحلات المدرسية",
      dueDate: "2023-10-01",
      isActive: true
    },
    {
      id: "tf3",
      name: "رسوم النقل المدرسي",
      grade: "9", // الصف التاسع
      schoolYear: "2023-2024",
      amount: 2000,
      currency: "ريال",
      description: "رسوم خدمة النقل المدرسي للعام الدراسي كاملاً",
      dueDate: "2023-09-15",
      isActive: true
    },
    {
      id: "tf4",
      name: "رسوم الكتب والقرطاسية",
      grade: "9", // الصف التاسع
      schoolYear: "2023-2024",
      amount: 800,
      currency: "ريال",
      description: "رسوم الكتب المدرسية والقرطاسية الأساسية",
      dueDate: "2023-09-15",
      isActive: true
    }
  ],
  
  // المدفوعات
  payments: [
    {
      id: "pay1",
      studentId: "3", // محمد الطالب
      guardianId: "4", // خالد ولي الأمر
      tuitionId: "tf1", // الرسوم الدراسية الأساسية
      amount: 7500,
      currency: "ريال",
      paymentDate: "2023-09-10",
      paymentMethod: "credit_card", // بطاقة ائتمان
      transactionId: "tr123456",
      status: "completed", // مكتملة
      notes: "الدفعة الأولى من الرسوم الدراسية",
      receivedBy: "1" // مدير النظام
    },
    {
      id: "pay2",
      studentId: "3", // محمد الطالب
      guardianId: "4", // خالد ولي الأمر
      tuitionId: "tf3", // رسوم النقل المدرسي
      amount: 2000,
      currency: "ريال",
      paymentDate: "2023-09-10",
      paymentMethod: "bank_transfer", // تحويل بنكي
      transactionId: "tr123457",
      status: "completed", // مكتملة
      notes: "رسوم النقل المدرسي كاملة",
      receivedBy: "1" // مدير النظام
    },
    {
      id: "pay3",
      studentId: "3", // محمد الطالب
      guardianId: "4", // خالد ولي الأمر
      tuitionId: "tf4", // رسوم الكتب والقرطاسية
      amount: 800,
      currency: "ريال",
      paymentDate: "2023-09-10",
      paymentMethod: "cash", // نقدًا
      transactionId: "tr123458",
      status: "completed", // مكتملة
      notes: "رسوم الكتب والقرطاسية كاملة",
      receivedBy: "1" // مدير النظام
    }
  ],
  
  // الفواتير
  invoices: [
    {
      id: "inv1",
      studentId: "3", // محمد الطالب
      guardianId: "4", // خالد ولي الأمر
      invoiceNumber: "INV-2023-001",
      issueDate: "2023-09-01",
      dueDate: "2023-09-15",
      items: [
        {
          id: "item1",
          tuitionId: "tf1", // الرسوم الدراسية الأساسية
          description: "الرسوم الدراسية الأساسية للفصلين الدراسيين",
          amount: 15000,
          currency: "ريال"
        },
        {
          id: "item2",
          tuitionId: "tf3", // رسوم النقل المدرسي
          description: "رسوم خدمة النقل المدرسي للعام الدراسي كاملاً",
          amount: 2000,
          currency: "ريال"
        },
        {
          id: "item3",
          tuitionId: "tf4", // رسوم الكتب والقرطاسية
          description: "رسوم الكتب المدرسية والقرطاسية الأساسية",
          amount: 800,
          currency: "ريال"
        }
      ],
      totalAmount: 17800,
      currency: "ريال",
      status: "partially_paid", // مدفوعة جزئيًا
      paidAmount: 10300,
      remainingAmount: 7500,
      notes: "يرجى سداد المبلغ المتبقي قبل تاريخ الاستحقاق",
      createdBy: "1" // مدير النظام
    }
  ],
  
  // خطط الدفع
  paymentPlans: [
    {
      id: "plan1",
      studentId: "3", // محمد الطالب
      guardianId: "4", // خالد ولي الأمر
      invoiceId: "inv1",
      name: "خطة تقسيط الرسوم الدراسية",
      description: "تقسيط الرسوم الدراسية الأساسية على قسطين",
      totalAmount: 15000,
      currency: "ريال",
      installments: [
        {
          id: "inst1",
          dueDate: "2023-09-15",
          amount: 7500,
          status: "paid", // مدفوعة
          paymentId: "pay1"
        },
        {
          id: "inst2",
          dueDate: "2024-01-15",
          amount: 7500,
          status: "pending" // قيد الانتظار
        }
      ],
      status: "active", // نشطة
      createdAt: "2023-09-01",
      createdBy: "1" // مدير النظام
    }
  ],
  
  // الخصومات والمنح
  discountsAndScholarships: [
    {
      id: "disc1",
      name: "خصم الإخوة",
      type: "discount", // خصم
      description: "خصم للطلاب الذين لديهم إخوة في المدرسة",
      percentage: 10,
      applyTo: "tuition", // الرسوم الدراسية
      isActive: true,
      startDate: "2023-09-01",
      endDate: "2024-08-31"
    },
    {
      id: "disc2",
      name: "خصم الدفع المبكر",
      type: "discount", // خصم
      description: "خصم للدفع المبكر قبل بداية العام الدراسي",
      percentage: 5,
      applyTo: "tuition", // الرسوم الدراسية
      isActive: true,
      startDate: "2023-07-01",
      endDate: "2023-08-15"
    },
    {
      id: "sch1",
      name: "منحة التفوق الدراسي",
      type: "scholarship", // منحة
      description: "منحة للطلاب المتفوقين دراسيًا",
      percentage: 50,
      applyTo: "tuition", // الرسوم الدراسية
      isActive: true,
      startDate: "2023-09-01",
      endDate: "2024-08-31"
    }
  ],
  
  // خصومات الطلاب
  studentDiscounts: [
    {
      id: "sd1",
      studentId: "3", // محمد الطالب
      discountId: "disc1", // خصم الإخوة
      schoolYear: "2023-2024",
      percentage: 10,
      amount: 1500, // 10% من 15000
      currency: "ريال",
      status: "active", // نشط
      approvedBy: "1", // مدير النظام
      approvedAt: "2023-08-25",
      notes: "الطالب لديه أخ في الصف السابع"
    }
  ],
  
  // الرواتب
  salaries: [
    {
      id: "sal1",
      employeeId: "2", // أحمد المعلم
      basicSalary: 8000,
      allowances: [
        {
          id: "allow1",
          name: "بدل سكن",
          amount: 2000,
          currency: "ريال"
        },
        {
          id: "allow2",
          name: "بدل نقل",
          amount: 500,
          currency: "ريال"
        }
      ],
      deductions: [
        {
          id: "ded1",
          name: "تأمينات اجتماعية",
          amount: 800,
          currency: "ريال"
        }
      ],
      totalAllowances: 2500,
      totalDeductions: 800,
      netSalary: 9700,
      currency: "ريال",
      effectiveDate: "2023-09-01",
      status: "active" // نشط
    }
  ],
  
  // رواتب الشهر
  monthlySalaries: [
    {
      id: "msal1",
      employeeId: "2", // أحمد المعلم
      month: 9, // سبتمبر
      year: 2023,
      basicSalary: 8000,
      allowances: 2500,
      deductions: 800,
      otherDeductions: 0,
      additions: 0,
      grossSalary: 10500,
      netSalary: 9700,
      currency: "ريال",
      paymentStatus: "paid", // مدفوع
      paymentDate: "2023-09-28",
      paymentMethod: "bank_transfer", // تحويل بنكي
      notes: ""
    }
  ],
  
  // المصروفات
  expenses: [
    {
      id: "exp1",
      category: "utilities", // مرافق
      subcategory: "electricity", // كهرباء
      amount: 5000,
      currency: "ريال",
      date: "2023-09-10",
      description: "فاتورة الكهرباء لشهر سبتمبر",
      paymentMethod: "bank_transfer", // تحويل بنكي
      reference: "UTIL-2023-001",
      approvedBy: "1", // مدير النظام
      status: "paid" // مدفوعة
    },
    {
      id: "exp2",
      category: "supplies", // مستلزمات
      subcategory: "office", // مكتبية
      amount: 1200,
      currency: "ريال",
      date: "2023-09-15",
      description: "شراء مستلزمات مكتبية",
      paymentMethod: "cash", // نقدًا
      reference: "SUP-2023-001",
      approvedBy: "1", // مدير النظام
      status: "paid" // مدفوعة
    }
  ],
  
  // الإيرادات
  revenues: [
    {
      id: "rev1",
      category: "tuition", // رسوم دراسية
      amount: 10300,
      currency: "ريال",
      date: "2023-09-10",
      description: "مدفوعات الرسوم الدراسية",
      reference: "TUI-2023-001",
      status: "completed" // مكتملة
    }
  ],
  
  // الميزانية
  budget: {
    id: "budget1",
    schoolYear: "2023-2024",
    categories: [
      {
        id: "budcat1",
        name: "رواتب",
        plannedAmount: 1200000,
        actualAmount: 300000,
        currency: "ريال",
        type: "expense", // مصروف
        notes: ""
      },
      {
        id: "budcat2",
        name: "مرافق",
        plannedAmount: 120000,
        actualAmount: 30000,
        currency: "ريال",
        type: "expense", // مصروف
        notes: ""
      },
      {
        id: "budcat3",
        name: "رسوم دراسية",
        plannedAmount: 2000000,
        actualAmount: 500000,
        currency: "ريال",
        type: "revenue", // إيراد
        notes: ""
      }
    ],
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "active", // نشط
    createdBy: "1", // مدير النظام
    createdAt: "2023-08-15"
  },
  
  // التقارير المالية
  financialReports: [
    {
      id: "rep1",
      name: "تقرير الإيرادات والمصروفات الشهري",
      type: "income_expense", // إيرادات ومصروفات
      period: "monthly", // شهري
      month: 9, // سبتمبر
      year: 2023,
      data: {
        revenues: [
          {
            category: "tuition", // رسوم دراسية
            amount: 10300,
            currency: "ريال"
          }
        ],
        expenses: [
          {
            category: "salaries", // رواتب
            amount: 9700,
            currency: "ريال"
          },
          {
            category: "utilities", // مرافق
            amount: 5000,
            currency: "ريال"
          },
          {
            category: "supplies", // مستلزمات
            amount: 1200,
            currency: "ريال"
          }
        ],
        totalRevenues: 10300,
        totalExpenses: 15900,
        netIncome: -5600,
        currency: "ريال"
      },
      createdBy: "1", // مدير النظام
      createdAt: "2023-09-30",
      status: "published" // منشور
    }
  ]
};

// الحصول على جميع الرسوم الدراسية النشطة
function getActiveTuitionFees(grade, schoolYear) {
  return financeData.tuitionFees.filter(fee => 
    fee.isActive && 
    (grade ? fee.grade === grade : true) && 
    (schoolYear ? fee.schoolYear === schoolYear : true)
  );
}

// الحصول على مدفوعات طالب معين
function getStudentPayments(studentId) {
  return financeData.payments.filter(payment => payment.studentId === studentId).map(payment => {
    const tuition = financeData.tuitionFees.find(fee => fee.id === payment.tuitionId);
    const guardian = users.find(user => user.id === payment.guardianId);
    const receiver = users.find(user => user.id === payment.receivedBy);
    
    return {
      ...payment,
      tuitionName: tuition?.name,
      guardianName: guardian?.name,
      receiverName: receiver?.name
    };
  });
}

// الحصول على فواتير طالب معين
function getStudentInvoices(studentId) {
  return financeData.invoices.filter(invoice => invoice.studentId === studentId).map(invoice => {
    const guardian = users.find(user => user.id === invoice.guardianId);
    const creator = users.find(user => user.id === invoice.createdBy);
    
    // إضافة معلومات المدفوعات المرتبطة بالفاتورة
    const relatedPayments = financeData.payments.filter(payment => 
      payment.studentId === studentId && 
      invoice.items.some(item => item.tuitionId === payment.tuitionId)
    );
    
    return {
      ...invoice,
      guardianName: guardian?.name,
      creatorName: creator?.name,
      payments: relatedPayments
    };
  });
}

// إنشاء فاتورة جديدة
function createInvoice(invoiceData) {
  const id = "inv" + (financeData.invoices.length + 1);
  const invoiceNumber = "INV-" + new Date().getFullYear() + "-" + String(financeData.invoices.length + 1).padStart(3, '0');
  
  // حساب إجمالي الفاتورة
  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  
  const newInvoice = {
    id,
    invoiceNumber,
    issueDate: new Date().toISOString().split('T')[0],
    ...invoiceData,
    totalAmount,
    paidAmount: 0,
    remainingAmount: totalAmount,
    status: "unpaid", // غير مدفوعة
  };
  
  financeData.invoices.push(newInvoice);
  
  return newInvoice;
}

// تسجيل دفعة جديدة
function registerPayment(paymentData) {
  const id = "pay" + (financeData.payments.length + 1);
  const transactionId = "tr" + Math.floor(Math.random() * 1000000);
  
  const newPayment = {
    id,
    transactionId,
    paymentDate: new Date().toISOString().split('T')[0],
    status: "completed", // مكتملة
    ...paymentData
  };
  
  financeData.payments.push(newPayment);
  
  // تحديث حالة الفاتورة المرتبطة (إن وجدت)
  if (paymentData.invoiceId) {
    updateInvoiceStatus(paymentData.invoiceId, paymentData.amount);
  }
  
  return newPayment;
}

// تحديث حالة الفاتورة بعد الدفع
function updateInvoiceStatus(invoiceId, paymentAmount) {
  const invoiceIndex = financeData.invoices.findIndex(inv => inv.id === invoiceId);
  
  if (invoiceIndex === -1) {
    return null;
  }
  
  const invoice = financeData.invoices[invoiceIndex];
  
  // تحديث المبلغ المدفوع والمتبقي
  const newPaidAmount = invoice.paidAmount + paymentAmount;
  const newRemainingAmount = invoice.totalAmount - newPaidAmount;
  
  // تحديث حالة الفاتورة
  let newStatus = invoice.status;
  if (newRemainingAmount <= 0) {
    newStatus = "paid"; // مدفوعة بالكامل
  } else if (newPaidAmount > 0) {
    newStatus = "partially_paid"; // مدفوعة جزئيًا
  }
  
  // تحديث الفاتورة
  financeData.invoices[invoiceIndex] = {
    ...invoice,
    paidAmount: newPaidAmount,
    remainingAmount: newRemainingAmount,
    status: newStatus
  };
  
  return financeData.invoices[invoiceIndex];
}

// إنشاء خطة دفع
function createPaymentPlan(planData) {
  const id = "plan" + (financeData.paymentPlans.length + 1);
  
  const newPlan = {
    id,
    createdAt: new Date().toISOString().split('T')[0],
    status: "active", // نشطة
    ...planData
  };
  
  financeData.paymentPlans.push(newPlan);
  
  return newPlan;
}

// الحصول على خطط الدفع لطالب معين
function getStudentPaymentPlans(studentId) {
  return financeData.paymentPlans.filter(plan => plan.studentId === studentId).map(plan => {
    const guardian = users.find(user => user.id === plan.guardianId);
    const invoice = financeData.invoices.find(inv => inv.id === plan.invoiceId);
    const creator = users.find(user => user.id === plan.createdBy);
    
    return {
      ...plan,
      guardianName: guardian?.name,
      invoiceNumber: invoice?.invoiceNumber,
      creatorName: creator?.name
    };
  });
}

// تطبيق خصم على طالب
function applyDiscountToStudent(discountData) {
  const id = "sd" + (financeData.studentDiscounts.length + 1);
  
  // الحصول على تفاصيل الخصم
  const discount = financeData.discountsAndScholarships.find(d => d.id === discountData.discountId);
  
  if (!discount) {
    return { success: false, message: "الخصم غير موجود" };
  }
  
  // الحصول على الرسوم الدراسية للطالب
  const tuitionFee = financeData.tuitionFees.find(fee => 
    fee.grade === discountData.grade && 
    fee.schoolYear === discountData.schoolYear && 
    fee.isActive
  );
  
  if (!tuitionFee) {
    return { success: false, message: "الرسوم الدراسية غير موجودة" };
  }
  
  // حساب قيمة الخصم
  const discountAmount = (tuitionFee.amount * discount.percentage) / 100;
  
  const newDiscount = {
    id,
    approvedAt: new Date().toISOString(),
    status: "active", // نشط
    percentage: discount.percentage,
    amount: discountAmount,
    currency: tuitionFee.currency,
    ...discountData
  };
  
  financeData.studentDiscounts.push(newDiscount);
  
  return { success: true, discount: newDiscount };
}

// الحصول على خصومات طالب معين
function getStudentDiscounts(studentId, schoolYear) {
  return financeData.studentDiscounts.filter(disc => 
    disc.studentId === studentId && 
    (schoolYear ? disc.schoolYear === schoolYear : true)
  ).map(disc => {
    const discount = financeData.discountsAndScholarships.find(d => d.id === disc.discountId);
    const approver = users.find(user => user.id === disc.approvedBy);
    
    return {
      ...disc,
      discountName: discount?.name,
      discountDescription: discount?.description,
      approverName: approver?.name
    };
  });
}

// الحصول على معلومات راتب موظف
function getEmployeeSalary(employeeId) {
  const salary = financeData.salaries.find(sal => sal.employeeId === employeeId && sal.status === "active");
  
  if (!salary) {
    return null;
  }
  
  const employee = users.find(user => user.id === employeeId);
  
  return {
    ...salary,
    employeeName: employee?.name
  };
}

// إنشاء راتب شهري
function createMonthlySalary(salaryData) {
  const id = "msal" + (financeData.monthlySalaries.length + 1);
  
  // الحصول على معلومات الراتب الأساسي
  const baseSalary = financeData.salaries.find(sal => 
    sal.employeeId === salaryData.employeeId && 
    sal.status === "active"
  );
  
  if (!baseSalary) {
    return { success: false, message: "الراتب الأساسي غير موجود" };
  }
  
  // حساب الراتب الإجمالي والصافي
  const grossSalary = baseSalary.basicSalary + baseSalary.totalAllowances;
  const netSalary = grossSalary - baseSalary.totalDeductions - (salaryData.otherDeductions || 0) + (salaryData.additions || 0);
  
  const newSalary = {
    id,
    basicSalary: baseSalary.basicSalary,
    allowances: baseSalary.totalAllowances,
    deductions: baseSalary.totalDeductions,
    otherDeductions: salaryData.otherDeductions || 0,
    additions: salaryData.additions || 0,
    grossSalary,
    netSalary,
    currency: baseSalary.currency,
    paymentStatus: "pending", // قيد الانتظار
    ...salaryData
  };
  
  financeData.monthlySalaries.push(newSalary);
  
  return { success: true, salary: newSalary };
}

// تسجيل مصروف جديد
function registerExpense(expenseData) {
  const id = "exp" + (financeData.expenses.length + 1);
  const reference = expenseData.category.toUpperCase().substr(0, 4) + "-" + new Date().getFullYear() + "-" + String(financeData.expenses.length + 1).padStart(3, '0');
  
  const newExpense = {
    id,
    reference,
    date: new Date().toISOString().split('T')[0],
    status: "pending", // قيد الانتظار
    ...expenseData
  };
  
  financeData.expenses.push(newExpense);
  
  return newExpense;
}

// الحصول على الإيرادات والمصروفات حسب الفترة
function getFinancialSummary(period, year, month) {
  // الإيرادات
  let revenuesQuery = financeData.revenues.filter(rev => {
    const revDate = new Date(rev.date);
    const revYear = revDate.getFullYear();
    const revMonth = revDate.getMonth() + 1;
    
    if (period === "monthly" && year && month) {
      return revYear === year && revMonth === month;
    } else if (period === "yearly" && year) {
      return revYear === year;
    } else {
      return true;
    }
  });
  
  // المصروفات
  let expensesQuery = financeData.expenses.filter(exp => {
    const expDate = new Date(exp.date);
    const expYear = expDate.getFullYear();
    const expMonth = expDate.getMonth() + 1;
    
    if (period === "monthly" && year && month) {
      return expYear === year && expMonth === month;
    } else if (period === "yearly" && year) {
      return expYear === year;
    } else {
      return true;
    }
  });
  
  // تجميع الإيرادات حسب الفئة
  const revenuesByCategory = revenuesQuery.reduce((acc, rev) => {
    const category = rev.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += rev.amount;
    return acc;
  }, {});
  
  // تجميع المصروفات حسب الفئة
  const expensesByCategory = expensesQuery.reduce((acc, exp) => {
    const category = exp.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += exp.amount;
    return acc;
  }, {});
  
  // حساب المجاميع
  const totalRevenues = revenuesQuery.reduce((sum, rev) => sum + rev.amount, 0);
  const totalExpenses = expensesQuery.reduce((sum, exp) => sum + exp.amount, 0);
  const netIncome = totalRevenues - totalExpenses;
  
  return {
    period,
    year,
    month,
    revenues: Object.keys(revenuesByCategory).map(category => ({
      category,
      amount: revenuesByCategory[category],
      currency: "ريال"
    })),
    expenses: Object.keys(expensesByCategory).map(category => ({
      category,
      amount: expensesByCategory[category],
      currency: "ريال"
    })),
    totalRevenues,
    totalExpenses,
    netIncome,
    currency: "ريال"
  };
}

// إنشاء تقرير مالي
function generateFinancialReport(reportData) {
  const id = "rep" + (financeData.financialReports.length + 1);
  
  // الحصول على ملخص مالي
  const financialSummary = getFinancialSummary(
    reportData.period, 
    reportData.year, 
    reportData.month
  );
  
  const newReport = {
    id,
    createdAt: new Date().toISOString(),
    status: "draft", // مسودة
    ...reportData,
    data: financialSummary
  };
  
  financeData.financialReports.push(newReport);
  
  return newReport;
}

// الحصول على تقارير مالية
function getFinancialReports(type, period, year, month) {
  return financeData.financialReports.filter(report => 
    (type ? report.type === type : true) && 
    (period ? report.period === period : true) && 
    (year ? report.year === year : true) && 
    (month ? report.month === month : true)
  ).map(report => {
    const creator = users.find(user => user.id === report.createdBy);
    
    return {
      ...report,
      creatorName: creator?.name
    };
  });
}

// تصدير الوظائف
window.financeSystem = {
  getActiveTuitionFees,
  getStudentPayments,
  getStudentInvoices,
  createInvoice,
  registerPayment,
  updateInvoiceStatus,
  createPaymentPlan,
  getStudentPaymentPlans,
  applyDiscountToStudent,
  getStudentDiscounts,
  getEmployeeSalary,
  createMonthlySalary,
  registerExpense,
  getFinancialSummary,
  generateFinancialReport,
  getFinancialReports,
  financeData
};