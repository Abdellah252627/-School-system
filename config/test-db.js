const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

const connectTestDB = async () => {
  try {
    // إنشاء خادم MongoDB في الذاكرة
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    console.log('Starting in-memory MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`Error connecting to in-memory MongoDB: ${err.message}`);
    process.exit(1);
  }
};

const disconnectTestDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectTestDB, disconnectTestDB };