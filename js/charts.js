// Charting and Statistics Functions

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Setup chart colors for light/dark mode
  const chartColors = {
    light: {
      primary: '#3498db',
      secondary: '#2c3e50',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      textColor: '#333333',
      gridColor: 'rgba(0, 0, 0, 0.1)'
    },
    dark: {
      primary: '#2196f3',
      secondary: '#424242',
      success: '#4caf50',
      warning: '#ff9800',
      danger: '#f44336',
      info: '#2196f3',
      textColor: '#e0e0e0',
      gridColor: 'rgba(255, 255, 255, 0.1)'
    }
  };

  // Check for dark mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  const colorSet = isDarkMode ? chartColors.dark : chartColors.light;

  // Listen for theme changes
  document.addEventListener('themeChanged', function(e) {
    const newColorSet = e.detail.isDarkMode ? chartColors.dark : chartColors.light;
    updateChartColors(newColorSet);
  });

  // Sample chart initializations (will be called when relevant dashboards are shown)
  if (document.getElementById('grades-chart')) {
    initGradesChart(colorSet);
  }

  if (document.getElementById('attendance-chart')) {
    initAttendanceChart(colorSet);
  }

  if (document.getElementById('performance-chart')) {
    initPerformanceChart(colorSet);
  }
});

// Initialize grades chart
function initGradesChart(colorSet) {
  const ctx = document.getElementById('grades-chart').getContext('2d');
  
  // Sample data - would come from the backend in a real application
  const subjects = ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية', 'التاريخ'];
  const studentGrades = [85, 92, 78, 88, 76];
  const classAverage = [75, 80, 72, 79, 68];
  
  const gradesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subjects,
      datasets: [
        {
          label: 'درجات الطالب',
          data: studentGrades,
          backgroundColor: colorSet.primary,
          borderColor: colorSet.primary,
          borderWidth: 1
        },
        {
          label: 'متوسط الفصل',
          data: classAverage,
          backgroundColor: colorSet.secondary,
          borderColor: colorSet.secondary,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: colorSet.gridColor
          },
          ticks: {
            color: colorSet.textColor
          }
        },
        x: {
          grid: {
            color: colorSet.gridColor
          },
          ticks: {
            color: colorSet.textColor
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colorSet.textColor
          }
        },
        title: {
          display: true,
          text: 'مقارنة الدرجات',
          color: colorSet.textColor
        }
      }
    }
  });
  
  // Store chart reference for later updates
  window.gradesChart = gradesChart;
}

// Initialize attendance chart
function initAttendanceChart(colorSet) {
  const ctx = document.getElementById('attendance-chart').getContext('2d');
  
  // Sample data
  const months = ['سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير', 'فبراير'];
  const attendanceData = {
    present: [20, 18, 19, 17, 20, 18],
    absent: [2, 4, 3, 3, 2, 1],
    excused: [0, 0, 0, 2, 0, 3]
  };
  
  const attendanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'حضور',
          data: attendanceData.present,
          backgroundColor: 'transparent',
          borderColor: colorSet.success,
          pointBackgroundColor: colorSet.success,
          tension: 0.3
        },
        {
          label: 'غياب',
          data: attendanceData.absent,
          backgroundColor: 'transparent',
          borderColor: colorSet.danger,
          pointBackgroundColor: colorSet.danger,
          tension: 0.3
        },
        {
          label: 'إذن',
          data: attendanceData.excused,
          backgroundColor: 'transparent',
          borderColor: colorSet.warning,
          pointBackgroundColor: colorSet.warning,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: colorSet.gridColor
          },
          ticks: {
            color: colorSet.textColor
          }
        },
        x: {
          grid: {
            color: colorSet.gridColor
          },
          ticks: {
            color: colorSet.textColor
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colorSet.textColor
          }
        },
        title: {
          display: true,
          text: 'سجل الحضور الشهري',
          color: colorSet.textColor
        }
      }
    }
  });
  
  // Store chart reference
  window.attendanceChart = attendanceChart;
}

// Initialize performance chart
function initPerformanceChart(colorSet) {
  const ctx = document.getElementById('performance-chart').getContext('2d');
  
  // Sample data
  const performanceData = {
    labels: ['المشاركة الصفية', 'الواجبات المنزلية', 'الاختبارات', 'المشاريع', 'السلوك'],
    datasets: [{
      label: 'مستوى الأداء',
      data: [85, 90, 78, 88, 95],
      backgroundColor: `rgba(${hexToRgb(colorSet.primary)}, 0.2)`,
      borderColor: colorSet.primary,
      pointBackgroundColor: colorSet.primary,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: colorSet.primary
    }]
  };
  
  const performanceChart = new Chart(ctx, {
    type: 'radar',
    data: performanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            color: colorSet.gridColor
          },
          grid: {
            color: colorSet.gridColor
          },
          pointLabels: {
            color: colorSet.textColor
          },
          ticks: {
            color: colorSet.textColor,
            backdropColor: 'transparent'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colorSet.textColor
          }
        }
      }
    }
  });
  
  // Store chart reference
  window.performanceChart = performanceChart;
}

// Update chart colors when theme changes
function updateChartColors(newColorSet) {
  // Update grades chart
  if (window.gradesChart) {
    window.gradesChart.data.datasets[0].backgroundColor = newColorSet.primary;
    window.gradesChart.data.datasets[0].borderColor = newColorSet.primary;
    window.gradesChart.data.datasets[1].backgroundColor = newColorSet.secondary;
    window.gradesChart.data.datasets[1].borderColor = newColorSet.secondary;
    
    window.gradesChart.options.scales.y.grid.color = newColorSet.gridColor;
    window.gradesChart.options.scales.y.ticks.color = newColorSet.textColor;
    window.gradesChart.options.scales.x.grid.color = newColorSet.gridColor;
    window.gradesChart.options.scales.x.ticks.color = newColorSet.textColor;
    
    window.gradesChart.options.plugins.legend.labels.color = newColorSet.textColor;
    window.gradesChart.options.plugins.title.color = newColorSet.textColor;
    
    window.gradesChart.update();
  }
  
  // Update attendance chart
  if (window.attendanceChart) {
    window.attendanceChart.data.datasets[0].borderColor = newColorSet.success;
    window.attendanceChart.data.datasets[0].pointBackgroundColor = newColorSet.success;
    window.attendanceChart.data.datasets[1].borderColor = newColorSet.danger;
    window.attendanceChart.data.datasets[1].pointBackgroundColor = newColorSet.danger;
    window.attendanceChart.data.datasets[2].borderColor = newColorSet.warning;
    window.attendanceChart.data.datasets[2].pointBackgroundColor = newColorSet.warning;
    
    window.attendanceChart.options.scales.y.grid.color = newColorSet.gridColor;
    window.attendanceChart.options.scales.y.ticks.color = newColorSet.textColor;
    window.attendanceChart.options.scales.x.grid.color = newColorSet.gridColor;
    window.attendanceChart.options.scales.x.ticks.color = newColorSet.textColor;
    
    window.attendanceChart.options.plugins.legend.labels.color = newColorSet.textColor;
    window.attendanceChart.options.plugins.title.color = newColorSet.textColor;
    
    window.attendanceChart.update();
  }
  
  // Update performance chart
  if (window.performanceChart) {
    window.performanceChart.data.datasets[0].backgroundColor = `rgba(${hexToRgb(newColorSet.primary)}, 0.2)`;
    window.performanceChart.data.datasets[0].borderColor = newColorSet.primary;
    window.performanceChart.data.datasets[0].pointBackgroundColor = newColorSet.primary;
    window.performanceChart.data.datasets[0].pointHoverBorderColor = newColorSet.primary;
    
    window.performanceChart.options.scales.r.angleLines.color = newColorSet.gridColor;
    window.performanceChart.options.scales.r.grid.color = newColorSet.gridColor;
    window.performanceChart.options.scales.r.pointLabels.color = newColorSet.textColor;
    window.performanceChart.options.scales.r.ticks.color = newColorSet.textColor;
    
    window.performanceChart.options.plugins.legend.labels.color = newColorSet.textColor;
    
    window.performanceChart.update();
  }
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}