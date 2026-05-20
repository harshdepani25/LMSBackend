const Instance = require("../config/razorpay");
const Payment = require("../Model/Payment.model");
const crypto = require('crypto');

const getAllPayment = async (req, res) => {
    try {
        const payment = await Payment.find();

        if (!payment) {
            return res.status(400).json({ data: null, meassage: "AllPayment Not added" })
        }

        return res.status(200).json({ data: payment, meassage: "AllPayment added Sucessfully" })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

const getPayment = async (req, res) => {
    try {
        const payment = await Payment.find(req.params.id)

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not get" })
        }

        res.status(200).json({ data: payment, message: 'Payment Sucess get' })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

const addPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body)

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not added" })
        }

        res.status(200).json({ data: payment, message: 'Payment Sucessfully Added' })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id)

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not Delete" })
        }

        res.status(200).json({ data: payment, message: 'Payment Sucess Delete' })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

const upadatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not Upadte" })
        }

        res.status(200).json({ data: payment, message: 'Payment Sucess Update' })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

const CreateOrder = async (req, res) => {
    try {
        const { amount, cart_id, user_id } = req.body;

        console.log("asdfdghg", req.body);
        
        const options = {
            amount: Number(amount),
            currency: "INR"
        };

        const Order = await Instance.orders.create(options);

        console.log(Order, options);
        
        
        const payment = await Payment.create({
            orderId: Order?.id,
            amount: Order?.amount,
            status: 'pending',
            user_id,
            cart_id,
        })

        res.status(200).json({
            success: true,
            Order,
            key: process.env.RAZORPAY_API_KEY
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.message })
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

        sha.update(`${razorpay_order_id + "|" + razorpay_payment_id}`)

        const digset = sha.digest("hex")

        if (digset !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment Is a Failed"
            })
        }

        const payment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
                status: 'completed'
            }
        )

        return res.status(200).json({
            message: "Payment Successfully",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id
        })
    } catch (error) {
        res.status(500).json({ data: null, message: "Internal Server Error: " + error.meassage })
    }
}

module.exports = {
    deletePayment,
    upadatePayment,
    addPayment,
    getPayment,
    getAllPayment,
    CreateOrder,
    verifyPayment
}