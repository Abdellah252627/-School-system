// Customization and Notifications Systems

// User preferences structure
let userPreferences = {
  theme: 'light', // 'light' or 'dark'
  accentColor: '#3498db', // Primary color
  fontSize: 'medium', // 'small', 'medium', or 'large'
  language: 'ar', // 'ar' for Arabic
  notifications: {
    showPopups: true,
    sound: true,
    emailAlerts: false,
    desktopNotifications: false
  },
  dashboard: {
    layout: 'default', // 'default', 'compact', or 'expanded'
    widgets: ['performance', 'attendance', 'grades', 'calendar', 'messages'],
    widgetOrder: ['grades', 'attendance', 'messages', 'calendar', 'performance']
  }
};

// Initialize customization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load user preferences from localStorage
  loadUserPreferences();
  
  // Apply user preferences
  applyUserPreferences();
  
  // Setup event listeners for customization controls
  setupCustomizationControls();
  
  // Initialize notifications system
  initNotificationsSystem();
});

// Load user preferences from localStorage
function loadUserPreferences() {
  const savedPreferences = localStorage.getItem('userPreferences');
  if (savedPreferences) {
    userPreferences = JSON.parse(savedPreferences);
  }
}

// Save user preferences to localStorage
function saveUserPreferences() {
  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

// Apply user preferences to the UI
function applyUserPreferences() {
  // Apply theme
  if (userPreferences.theme === 'dark') {
    document.body.classList.add('dark-mode');
    if (document.getElementById('dark-mode-toggle')) {
      document.getElementById('dark-mode-toggle').checked = true;
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (document.getElementById('dark-mode-toggle')) {
      document.getElementById('dark-mode-toggle').checked = false;
    }
  }
  
  // Apply accent color
  document.documentElement.style.setProperty('--primary-color', userPreferences.accentColor);
  document.documentElement.style.setProperty('--primary-color-dark', adjustColorBrightness(userPreferences.accentColor, -20));
  
  // Apply font size
  document.body.classList.remove('font-small', 'font-medium', 'font-large');
  document.body.classList.add(`font-${userPreferences.fontSize}`);
  
  // Apply dashboard layout
  if (document.querySelector('.dashboard')) {
    document.querySelector('.dashboard').classList.remove('layout-default', 'layout-compact', 'layout-expanded');
    document.querySelector('.dashboard').classList.add(`layout-${userPreferences.dashboard.layout}`);
  }
  
  // Apply widget order
  if (document.getElementById('widgets-container')) {
    reorderWidgets();
  }
  
  // Dispatch theme change event for charts
  document.dispatchEvent(new CustomEvent('themeChanged', {
    detail: {
      isDarkMode: userPreferences.theme === 'dark',
      accentColor: userPreferences.accentColor
    }
  }));
}

// Setup event listeners for customization controls
function setupCustomizationControls() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      userPreferences.theme = this.checked ? 'dark' : 'light';
      applyUserPreferences();
      saveUserPreferences();
    });
  }
  
  // Accent color picker
  const accentColorPicker = document.getElementById('accent-color-picker');
  if (accentColorPicker) {
    accentColorPicker.value = userPreferences.accentColor;
    accentColorPicker.addEventListener('change', function() {
      userPreferences.accentColor = this.value;
      applyUserPreferences();
      saveUserPreferences();
    });
  }
  
  // Font size selector
  const fontSizeSelector = document.getElementById('font-size-selector');
  if (fontSizeSelector) {
    fontSizeSelector.value = userPreferences.fontSize;
    fontSizeSelector.addEventListener('change', function() {
      userPreferences.fontSize = this.value;
      applyUserPreferences();
      saveUserPreferences();
    });
  }
  
  // Dashboard layout selector
  const layoutSelector = document.getElementById('layout-selector');
  if (layoutSelector) {
    layoutSelector.value = userPreferences.dashboard.layout;
    layoutSelector.addEventListener('change', function() {
      userPreferences.dashboard.layout = this.value;
      applyUserPreferences();
      saveUserPreferences();
    });
  }
  
  // Widget visibility toggles
  document.querySelectorAll('.widget-toggle').forEach(toggle => {
    const widgetName = toggle.getAttribute('data-widget');
    toggle.checked = userPreferences.dashboard.widgets.includes(widgetName);
    
    toggle.addEventListener('change', function() {
      if (this.checked) {
        userPreferences.dashboard.widgets.push(widgetName);
        userPreferences.dashboard.widgetOrder.push(widgetName);
      } else {
        userPreferences.dashboard.widgets = userPreferences.dashboard.widgets.filter(w => w !== widgetName);
        userPreferences.dashboard.widgetOrder = userPreferences.dashboard.widgetOrder.filter(w => w !== widgetName);
      }
      applyUserPreferences();
      saveUserPreferences();
    });
  });
  
  // Widget order controls (drag and drop)
  if (document.getElementById('widgets-order-list')) {
    setupWidgetReordering();
  }
  
  // Notification settings
  document.querySelectorAll('.notification-setting').forEach(setting => {
    const settingName = setting.getAttribute('data-setting');
    setting.checked = userPreferences.notifications[settingName];
    
    setting.addEventListener('change', function() {
      userPreferences.notifications[settingName] = this.checked;
      saveUserPreferences();
      
      // Request notification permission if needed
      if (settingName === 'desktopNotifications' && this.checked) {
        requestNotificationPermission();
      }
    });
  });
}

// Setup widget reordering with drag and drop
function setupWidgetReordering() {
  const widgetsList = document.getElementById('widgets-order-list');
  
  // Create sortable list
  new Sortable(widgetsList, {
    animation: 150,
    ghostClass: 'widget-item-ghost',
    onEnd: function() {
      // Update widget order based on new DOM order
      const newOrder = [];
      widgetsList.querySelectorAll('.widget-item').forEach(item => {
        newOrder.push(item.getAttribute('data-widget'));
      });
      
      userPreferences.dashboard.widgetOrder = newOrder;
      applyUserPreferences();
      saveUserPreferences();
    }
  });
}

// Apply widget order to dashboard
function reorderWidgets() {
  const container = document.getElementById('widgets-container');
  const widgetOrder = userPreferences.dashboard.widgetOrder;
  const visibleWidgets = userPreferences.dashboard.widgets;
  
  // Show or hide widgets based on settings
  document.querySelectorAll('.widget').forEach(widget => {
    const widgetName = widget.getAttribute('data-widget');
    if (visibleWidgets.includes(widgetName)) {
      widget.classList.remove('hidden');
    } else {
      widget.classList.add('hidden');
    }
  });
  
  // Reorder visible widgets
  widgetOrder.forEach(widgetName => {
    const widget = container.querySelector(`.widget[data-widget="${widgetName}"]`);
    if (widget && visibleWidgets.includes(widgetName)) {
      container.appendChild(widget);
    }
  });
}

// Initialize notifications system
function initNotificationsSystem() {
  // Check if browser supports notifications
  if ('Notification' in window && userPreferences.notifications.desktopNotifications) {
    requestNotificationPermission();
  }
  
  // Setup notification center UI
  setupNotificationCenter();
  
  // Simulate getting notifications (for demo purposes)
  simulateNotifications();
}

// Request notification permission
function requestNotificationPermission() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

// Setup notification center UI
function setupNotificationCenter() {
  // Create notification bell if it doesn't exist
  if (!document.getElementById('notification-bell')) {
    const navMenu = document.getElementById('main-nav');
    if (navMenu) {
      const notificationLi = document.createElement('li');
      notificationLi.innerHTML = `
        <a href="#" id="notification-bell">
          <span class="notification-icon">🔔</span>
          <span class="notification-badge" id="notification-count">0</span>
        </a>
      `;
      navMenu.appendChild(notificationLi);
      
      // Create notification panel
      const notificationPanel = document.createElement('div');
      notificationPanel.id = 'notification-panel';
      notificationPanel.className = 'notification-panel hidden';
      notificationPanel.innerHTML = `
        <div class="notification-header">
          <h3>الإشعارات</h3>
          <button id="mark-all-read">تعيين الكل كمقروء</button>
        </div>
        <div class="notification-list" id="notification-list">
          <div class="empty-notifications">لا توجد إشعارات</div>
        </div>
      `;
      document.body.appendChild(notificationPanel);
      
      // Add event listeners
      document.getElementById('notification-bell').addEventListener('click', function(e) {
        e.preventDefault();
        toggleNotificationPanel();
      });
      
      document.getElementById('mark-all-read').addEventListener('click', function() {
        markAllNotificationsAsRead();
      });
      
      // Close panel when clicking outside
      document.addEventListener('click', function(e) {
        const panel = document.getElementById('notification-panel');
        const bell = document.getElementById('notification-bell');
        
        if (!panel.contains(e.target) && e.target !== bell && !bell.contains(e.target)) {
          panel.classList.add('hidden');
        }
      });
    }
  }
}

// Toggle notification panel visibility
function toggleNotificationPanel() {
  const panel = document.getElementById('notification-panel');
  panel.classList.toggle('hidden');
}

// Add a new notification
function addNotification(notification) {
  // Get notification list
  const notificationList = document.getElementById('notification-list');
  const emptyMessage = notificationList.querySelector('.empty-notifications');
  
  // Remove empty message if present
  if (emptyMessage) {
    emptyMessage.remove();
  }
  
  // Create notification item
  const notificationItem = document.createElement('div');
  notificationItem.className = 'notification-item unread';
  notificationItem.dataset.id = notification.id;
  
  const timestamp = new Date(notification.timestamp);
  const timeFormatted = timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = timestamp.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' });
  
  notificationItem.innerHTML = `
    <div class="notification-content">
      <div class="notification-title">${notification.title}</div>
      <div class="notification-message">${notification.message}</div>
      <div class="notification-time">${timeFormatted} - ${dateFormatted}</div>
    </div>
    <div class="notification-actions">
      <button class="mark-read" title="تعيين كمقروء">✓</button>
      <button class="delete-notification" title="حذف">×</button>
    </div>
  `;
  
  // Add to notification list
  notificationList.prepend(notificationItem);
  
  // Update notification count
  updateNotificationCount();
  
  // Show popup notification if enabled
  if (userPreferences.notifications.showPopups) {
    showNotificationPopup(notification);
  }
  
  // Show desktop notification if enabled
  if (userPreferences.notifications.desktopNotifications && Notification.permission === 'granted') {
    const desktopNotification = new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.ico'
    });
    
    desktopNotification.onclick = function() {
      window.focus();
      toggleNotificationPanel();
    };
  }
  
  // Play sound if enabled
  if (userPreferences.notifications.sound) {
    playNotificationSound();
  }
  
  // Add event listeners to buttons
  notificationItem.querySelector('.mark-read').addEventListener('click', function() {
    markNotificationAsRead(notification.id);
  });
  
  notificationItem.querySelector('.delete-notification').addEventListener('click', function() {
    deleteNotification(notification.id);
  });
  
  // Auto mark as read when clicked
  notificationItem.addEventListener('click', function(e) {
    if (!e.target.closest('.notification-actions')) {
      markNotificationAsRead(notification.id);
    }
  });
}

// Mark notification as read
function markNotificationAsRead(id) {
  const notificationItem = document.querySelector(`.notification-item[data-id="${id}"]`);
  if (notificationItem) {
    notificationItem.classList.remove('unread');
    updateNotificationCount();
  }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
  document.querySelectorAll('.notification-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
  updateNotificationCount();
}

// Delete notification
function deleteNotification(id) {
  const notificationItem = document.querySelector(`.notification-item[data-id="${id}"]`);
  if (notificationItem) {
    notificationItem.remove();
    updateNotificationCount();
    
    // Show empty message if no notifications
    const notificationList = document.getElementById('notification-list');
    if (notificationList.children.length === 0) {
      notificationList.innerHTML = '<div class="empty-notifications">لا توجد إشعارات</div>';
    }
  }
}

// Update notification count
function updateNotificationCount() {
  const unreadCount = document.querySelectorAll('.notification-item.unread').length;
  const countElement = document.getElementById('notification-count');
  
  countElement.textContent = unreadCount;
  
  if (unreadCount > 0) {
    countElement.classList.add('active');
  } else {
    countElement.classList.remove('active');
  }
}

// Show notification popup
function showNotificationPopup(notification) {
  // Create popup if it doesn't exist
  let popup = document.getElementById('notification-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'notification-popup';
    popup.className = 'notification-popup hidden';
    document.body.appendChild(popup);
  }
  
  // Set popup content
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-title">${notification.title}</div>
      <div class="popup-message">${notification.message}</div>
    </div>
    <button class="close-popup">×</button>
  `;
  
  // Show popup
  popup.classList.remove('hidden');
  
  // Add event listener to close button
  popup.querySelector('.close-popup').addEventListener('click', function() {
    popup.classList.add('hidden');
  });
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    if (popup) {
      popup.classList.add('hidden');
    }
  }, 5000);
}

// Play notification sound
function playNotificationSound() {
  const sound = new Audio('/notification-sound.mp3');
  sound.play().catch(error => {
    console.log('Failed to play notification sound:', error);
  });
}

// Simulate notifications (for demo purposes)
function simulateNotifications() {
  const notifications = [
    {
      id: 1,
      title: 'تم إضافة درجة جديدة',
      message: 'تم إضافة درجة جديدة في مادة الرياضيات: 85/100',
      timestamp: new Date()
    },
    {
      id: 2,
      title: 'رسالة جديدة',
      message: 'رسالة جديدة من أحمد المعلم حول الواجب المنزلي',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: 3,
      title: 'تذكير: اجتماع أولياء الأمور',
      message: 'تذكير بأن اجتماع أولياء الأمور سيعقد غداً الساعة 5 مساءً',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    }
  ];
  
  // Add notifications with a delay
  setTimeout(() => {
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification);
      }, index * 2000); // Add notifications 2 seconds apart
    });
  }, 3000); // Start after 3 seconds
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex, percent) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust brightness
  r = Math.max(0, Math.min(255, r + percent));
  g = Math.max(0, Math.min(255, g + percent));
  b = Math.max(0, Math.min(255, b + percent));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}