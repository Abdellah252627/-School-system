// نظام المراسلات والتواصل

// هيكل بيانات المراسلات (بيانات محاكاة)
const messagingData = {
  // قائمة المحادثات
  conversations: [
    {
      id: "conv1",
      participants: ["2", "4"], // أحمد المعلم وخالد ولي الأمر
      title: "أداء الطالب محمد",
      createdAt: "2024-05-01",
      updatedAt: "2024-05-10",
      unreadCount: {
        "2": 0, // أحمد المعلم قرأ جميع الرسائل
        "4": 1  // خالد ولي الأمر لديه رسالة واحدة غير مقروءة
      }
    },
    {
      id: "conv2",
      participants: ["2", "3"], // أحمد المعلم ومحمد الطالب
      title: "استفسار حول الواجب المنزلي",
      createdAt: "2024-05-08",
      updatedAt: "2024-05-09",
      unreadCount: {
        "2": 1, // أحمد المعلم لديه رسالة واحدة غير مقروءة
        "3": 0  // محمد الطالب قرأ جميع الرسائل
      }
    },
    {
      id: "conv3",
      participants: ["1", "2"], // مدير النظام وأحمد المعلم
      title: "اجتماع المعلمين القادم",
      createdAt: "2024-05-05",
      updatedAt: "2024-05-05",
      unreadCount: {
        "1": 0, // مدير النظام قرأ جميع الرسائل
        "2": 0  // أحمد المعلم قرأ جميع الرسائل
      }
    }
  ],
  
  // قائمة الرسائل
  messages: [
    {
      id: "msg1",
      conversationId: "conv1",
      senderId: "2", // أحمد المعلم
      content: "مرحباً، أود إبلاغكم بأن ابنكم محمد يحتاج إلى مزيد من الاهتمام بواجبات الرياضيات.",
      timestamp: "2024-05-01T14:30:00",
      readBy: ["2", "4"]
    },
    {
      id: "msg2",
      conversationId: "conv1",
      senderId: "4", // خالد ولي الأمر
      content: "شكراً لإبلاغي، سأحرص على متابعته في المنزل. هل هناك تمارين إضافية يمكن أن يقوم بها؟",
      timestamp: "2024-05-01T15:45:00",
      readBy: ["4"]
    },
    {
      id: "msg3",
      conversationId: "conv1",
      senderId: "2", // أحمد المعلم
      content: "نعم، سأرسل لكم مجموعة من التمارين الإضافية قريباً. كما أنصح بمراجعة الدروس السابقة معه.",
      timestamp: "2024-05-01T16:20:00",
      readBy: ["2"]
    },
    {
      id: "msg4",
      conversationId: "conv2",
      senderId: "3", // محمد الطالب
      content: "أستاذ، لدي استفسار حول الواجب المنزلي الخاص بمادة العلوم. هل يمكنني استخدام مصادر خارجية؟",
      timestamp: "2024-05-08T18:10:00",
      readBy: ["2", "3"]
    },
    {
      id: "msg5",
      conversationId: "conv2",
      senderId: "2", // أحمد المعلم
      content: "نعم، يمكنك استخدام مصادر خارجية مع ضرورة ذكر المراجع في نهاية التقرير.",
      timestamp: "2024-05-08T19:25:00",
      readBy: ["3"]
    },
    {
      id: "msg6",
      conversationId: "conv2",
      senderId: "3", // محمد الطالب
      content: "شكراً جزيلاً. سأقوم بإعداد التقرير وتضمين المراجع.",
      timestamp: "2024-05-09T10:15:00",
      readBy: ["3"]
    },
    {
      id: "msg7",
      conversationId: "conv3",
      senderId: "1", // مدير النظام
      content: "تذكير: سيعقد اجتماع المعلمين يوم الأربعاء القادم الساعة 3 مساءً في قاعة الاجتماعات.",
      timestamp: "2024-05-05T09:00:00",
      readBy: ["1", "2"]
    }
  ],
  
  // الإعلانات
  announcements: [
    {
      id: "ann1",
      title: "بدء الاختبارات النهائية",
      content: "نود إعلامكم أن الاختبارات النهائية ستبدأ يوم 15 يونيو وتستمر حتى 25 يونيو. يرجى الاطلاع على جدول الاختبارات المرفق.",
      publisherId: "1", // مدير النظام
      publishDate: "2024-05-05",
      audience: ["teachers", "students", "parents"],
      attachments: [
        { name: "جدول الاختبارات النهائية.pdf", size: "1.5MB", url: "#" }
      ]
    },
    {
      id: "ann2",
      title: "تعليق الدوام المدرسي",
      content: "نظراً للأحوال الجوية، سيتم تعليق الدوام المدرسي غداً الخميس. وسيتم تعويض اليوم لاحقاً.",
      publisherId: "1", // مدير النظام
      publishDate: "2024-05-10",
      audience: ["teachers", "students", "parents"],
      attachments: []
    },
    {
      id: "ann3",
      title: "مسابقة الرياضيات",
      content: "يسر قسم الرياضيات الإعلان عن مسابقة الرياضيات السنوية. يمكن للطلاب المهتمين التسجيل لدى معلم الرياضيات.",
      publisherId: "2", // أحمد المعلم
      publishDate: "2024-05-08",
      audience: ["students", "parents"],
      attachments: [
        { name: "تفاصيل المسابقة.pdf", size: "0.8MB", url: "#" }
      ]
    }
  ]
};

// الحصول على محادثات المستخدم
function getUserConversations(userId) {
  return messagingData.conversations.filter(conv => conv.participants.includes(userId))
    .map(conv => {
      // العثور على آخر رسالة في المحادثة
      const lastMessage = messagingData.messages
        .filter(msg => msg.conversationId === conv.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
      
      // العثور على المشارك الآخر في المحادثة الثنائية
      const otherParticipantId = conv.participants.find(id => id !== userId);
      const otherParticipant = users.find(user => user.id === otherParticipantId);
      
      return {
        ...conv,
        lastMessage,
        otherParticipant,
        unread: conv.unreadCount[userId] || 0
      };
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

// الحصول على رسائل محادثة معينة
function getConversationMessages(conversationId, userId) {
  // تحديث حالة القراءة
  messagingData.messages
    .filter(msg => msg.conversationId === conversationId && !msg.readBy.includes(userId))
    .forEach(msg => {
      msg.readBy.push(userId);
    });
  
  // تحديث عدد الرسائل غير المقروءة
  const conversation = messagingData.conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    conversation.unreadCount[userId] = 0;
  }
  
  return messagingData.messages
    .filter(msg => msg.conversationId === conversationId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

// إرسال رسالة جديدة
function sendMessage(conversationId, senderId, content) {
  const id = "msg" + (messagingData.messages.length + 1);
  const timestamp = new Date().toISOString();
  
  const newMessage = {
    id,
    conversationId,
    senderId,
    content,
    timestamp,
    readBy: [senderId]
  };
  
  messagingData.messages.push(newMessage);
  
  // تحديث المحادثة
  const conversation = messagingData.conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    conversation.updatedAt = new Date().toISOString().split('T')[0];
    
    // زيادة عدد الرسائل غير المقروءة للمشاركين الآخرين
    conversation.participants.forEach(participantId => {
      if (participantId !== senderId) {
        conversation.unreadCount[participantId] = (conversation.unreadCount[participantId] || 0) + 1;
      }
    });
  }
  
  return newMessage;
}

// إنشاء محادثة جديدة
function createConversation(participants, title) {
  const id = "conv" + (messagingData.conversations.length + 1);
  const now = new Date().toISOString().split('T')[0];
  
  const unreadCount = {};
  participants.forEach(participantId => {
    unreadCount[participantId] = 0;
  });
  
  const newConversation = {
    id,
    participants,
    title,
    createdAt: now,
    updatedAt: now,
    unreadCount
  };
  
  messagingData.conversations.push(newConversation);
  return newConversation;
}

// الحصول على الإعلانات حسب الجمهور المستهدف
function getAnnouncementsByAudience(audience) {
  return messagingData.announcements
    .filter(ann => ann.audience.includes(audience))
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

// إنشاء إعلان جديد
function createAnnouncement(title, content, publisherId, audience, attachments = []) {
  const id = "ann" + (messagingData.announcements.length + 1);
  const publishDate = new Date().toISOString().split('T')[0];
  
  const newAnnouncement = {
    id,
    title,
    content,
    publisherId,
    publishDate,
    audience,
    attachments
  };
  
  messagingData.announcements.push(newAnnouncement);
  return newAnnouncement;
}

// تصدير الوظائف
window.messagingSystem = {
  getUserConversations,
  getConversationMessages,
  sendMessage,
  createConversation,
  getAnnouncementsByAudience,
  createAnnouncement,
  messagingData
};