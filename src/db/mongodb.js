const mongoose = require('mongoose');

let isConnected = false;

const mongodb = async () => {
    if (isConnected) {
        console.log('✅ Using existing MongoDB connection');
        return;
    }

    console.log('🔍 Attempting MongoDB connection...');
    console.log('🔍 URI exists:', !!process.env.MONGODB_URI);
    console.log('🔍 URI value:', process.env.MONGODB_URI);

    try {
        mongoose.connection.on('connecting', () => console.log('🔄 Mongoose: connecting...'));
        mongoose.connection.on('connected', () => console.log('✅ Mongoose: connected!'));
        mongoose.connection.on('error', (err) => console.error('❌ Mongoose error:', err.message));
        mongoose.connection.on('disconnected', () => console.log('⚠️ Mongoose: disconnected'));

        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
            maxPoolSize: 10,
            bufferCommands: false,
        });

        isConnected = true;
        console.log('✅ MongoDB Connected:', db.connection.host);
    } catch (error) {
        isConnected = false;
        console.error('❌ MongoDB connection FAILED:', error.message);
        console.error('❌ Full error:', JSON.stringify(error, null, 2));
        throw error;
    }
};

module.exports = mongodb;