#!/bin/bash

echo "=== تثبيت نظام إدارة المدرسة ==="

# التحقق من تثبيت Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js غير مثبت. الرجاء تثبيت Node.js أولاً."
    exit 1
fi

# التحقق من تثبيت MongoDB
if ! command -v mongod &> /dev/null
then
    echo "⚠️ لم يتم العثور على MongoDB. تأكد من تثبيته وتشغيله."
    echo "⚠️ يمكنك تنزيله من: https://www.mongodb.com/try/download/community"
else
    echo "✅ تم العثور على MongoDB"
fi

echo "📦 جاري تثبيت الاعتمادات..."
npm install

# إنشاء ملف .env إذا لم يكن موجوداً
if [ ! -f .env ]; then
    echo "🔧 إنشاء ملف .env..."
    echo "MONGODB_URI=mongodb://localhost:27017/school_system" > .env
    echo "SESSION_SECRET=school_management_system_secret" >> .env
    echo "PORT=3000" >> .env
fi

echo "🔧 إعداد قاعدة البيانات وإنشاء المستخدم الأول..."
node setup.js

echo "✅ تم تثبيت النظام بنجاح!"
echo "🚀 لتشغيل النظام، قم بتنفيذ الأمر: npm start"
echo "🌐 ثم قم بزيارة: http://localhost:3000"
echo "🔑 بيانات الدخول الأولية:"
echo "    اسم المستخدم: admin"
echo "    كلمة المرور: admin123"
echo "⚠️ لا تنسى تغيير كلمة المرور بعد تسجيل الدخول للمرة الأولى!"