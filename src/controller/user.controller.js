const Users = require("../model/user.model");
const bcrypt = require('bcrypt');
const sendMail = require("../servicer/nodemailer");
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashPass = await bcrypt.hash(password, 10)
        const OTP = Math.floor(100000 + Math.random() * 900000)
        const userExites = await Users.findOne({ email })
        const user = await Users.create({ ...req.body, password: hashPass, OTP: OTP });

        if (userExites) {
            return res.status(400).json({ sucess: false, data: null, Message: "User Already Exites" })
        }

        sendMail(email, "Register OTP ", "Your OTP is : " + OTP);

        const userdata = await Users.findOne({ email }).select('-password -OTP')

        if (!user) {
            return res.status(400).json({ sucess: false, data: [], Message: "Users register not complete" })
        }

        return res.status(200).json({ sucess: true, data: userdata, Message: "Users register sucessfully." })

    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

const is_verify = async (req,res) => {
    try {
        const {email, OTP} = req.body;
        
        const userverify = await Users.findOne({email: email , OTP : OTP})

        if(!userverify){
            return res.status(400).json({ sucess: false, data: null, Message: "Invaild Username/Email or OTP" })
        }

        userverify.is_verify = true;

        userverify.save();

        return res.status(200).json({ sucess: true, data: userverify, Message: "Users Verfivcation Complete." })
        

    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    const userExites = await Users.findOne({ email })

    if (!userExites) {
        return res.status(400).json({ sucess: false, data: null, Message: "User not Exites" })
    }

    const passisMatched = await bcrypt.compare(password, userExites.password);
    console.log(passisMatched);

    if(!passisMatched){
        return res.status(400).json({ sucess: false, data: null, Message: "Invaild Password or Username/Email" })
    }

    const accessToken = jwt.sign({
        email: userExites.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
    });

    const refreshToken = jwt.sign({
        email: userExites.email,
    }, process.env.REFRESH_TOKEN_SECRET, { 
        expiresIn: '1d' });

    res.cookie('LoginCookies', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }); 

    // return res.status(200).json({ sucess: true, data: userExites, Message: "Users logined Complete." })
    return res.json({ accessToken , refreshToken});

    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

module.exports = {
    register,
    is_verify,
    login
}