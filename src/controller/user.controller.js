const Users = require("../model/user.model");
const bcrypt = require('bcrypt');
const sendMail = require("../servicer/nodemailer");

const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashPass = await bcrypt.hash(password, 10)
        const OTP = Math.floor(100000 + Math.random() * 900000)
        const userExites = await Users.findOne({email})
        const user = await Users.create({ ...req.body, password: hashPass, OTP: OTP });

        if(userExites){
            return res.status(400).json({ sucess: false, data: null, Message: "User Already Exites" })
        }

        sendMail(email, "Register OTP ", "Your OTP is : " + OTP);

        const userdata = await Users.findOne({email}).select('-password')

        if (!user) {
            return res.status(400).json({ sucess: false, data: [], Message: "Users not added" })
        }

        return res.status(200).json({ sucess: true, data: userdata, Message: "Users register sucessfully." })

    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}



module.exports = {
   register
}