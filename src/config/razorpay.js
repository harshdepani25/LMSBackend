const Razorpay = require("Razorpay");

const Instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = Instance;