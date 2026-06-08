const { default: mongoose } = require("mongoose");

let cachedConnection = null;

const MongoDB = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL environment variable is missing.");
        return;
    }

    if (cachedConnection) {
        console.log("Using cached MongoDB connection");
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected successfully");
        return cachedConnection;
    } catch (error) {
        console.error("Error to connect : " + error);
        cachedConnection = null;
        throw error;
    }
}

module.exports = MongoDB;