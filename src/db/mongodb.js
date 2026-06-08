const { default: mongoose } = require("mongoose");

let cachedConnection = null;

const MongoDB = async () => {
   if (isConnected) {
        console.log('✅ Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,  // ✅ 30 seconds timeout
            socketTimeoutMS: 45000,           // ✅ 45 seconds socket timeout
            connectTimeoutMS: 30000,          // ✅ 30 seconds connect timeout
            maxPoolSize: 10,                  // ✅ connection pool
            bufferCommands: false,            // ✅ don't buffer if not connected
        });

        isConnected = true;
        console.log('✅ MongoDB Connected:', db.connection.host);
    } catch (error) {
        isConnected = false;
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

module.exports = MongoDB;
