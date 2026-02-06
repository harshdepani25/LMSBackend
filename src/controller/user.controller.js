const Users = require("../model/user.model");
const bcrypt = require("bcrypt");
const sendMail = require("../servicer/nodemailer");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const sendSMS = require("../servicer/twilio");

const tokenGenrater = async (_id) => {
  try {
    console.log(_id);

    const user = await Users.findById(_id);

    const accessToken = jwt.sign(
      { _id: _id, expiresIn: "1h", role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );

    const refreshToken = jwt.sign(
      {
        _id: _id,
        expiresIn: "7d",
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.refreshToken = refreshToken;

    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password , phone_no} = req.body;

    const hashPass = await bcrypt.hash(password, 10);
    
    const OTP = Math.floor(100000 + Math.random() * 900000);
    
    const userExites = await Users.findOne({ email });
    
    const user = await Users.create({
      ...req.body,
      password: hashPass,
      OTP: OTP,
    });

    if (userExites) {
      return res
        .status(400)
        .json({ sucess: false, data: null, Message: "User Already Exites" });
    }

    // sendMail(email, "Register OTP ", "Your OTP is : " + OTP);
    sendSMS(phone_no, OTP)

    const userdata = await Users.findOne({ email }).select("-password -OTP");

    if (!user) {
      return res
        .status(400)
        .json({
          sucess: false,
          data: [],
          Message: "Users register not complete",
        });
    }

    return res
      .status(200)
      .json({
        sucess: true,
        data: userdata,
        Message: "Users register sucessfully.",
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
};

const is_verify = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    const userverify = await Users.findOne({ email: email, OTP: OTP });

    if (!userverify) {
      return res
        .status(400)
        .json({
          sucess: false,
          data: null,
          Message: "Invaild Username/Email or OTP",
        });
    }

    userverify.is_verify = true;

    userverify.save();

    return res
      .status(200)
      .json({
        sucess: true,
        data: userverify,
        Message: "Users Verfivcation Complete.",
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExites = await Users.findOne({ email });

    if (!userExites) {
      return res
        .status(400)
        .json({ sucess: false, data: null, Message: "User not Exites" });
    }

    const passisMatched = await bcrypt.compare(password, userExites.password);
    console.log(passisMatched);

    if (!passisMatched) {
      return res
        .status(400)
        .json({
          sucess: false,
          data: null,
          Message: "Invaild Password or Username/Email",
        });
    }

    if (!userExites.is_verify) {
      return res
        .status(400)
        .json({ sucess: false, data: null, Message: "Verify Email." });
    }

    const { accessToken, refreshToken } = await tokenGenrater(userExites._id);

    console.log(accessToken, refreshToken);

    const accOPNT = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 1000
    }

    const refOPNT = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 7 * 60 * 60 * 1000
    }

    return res
      .cookie("accessToken", accessToken, accOPNT)
      .cookie("refereshtoken", refreshToken, refOPNT)
      .status(200)
      .json({
        sucess: true,
        data: Users,
        Message: "Login Complete Sucessfully.",
      });


  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
};

const gereratenewToken = async (req, res) => {
  try {
    console.log(req.cookies.refereshtoken);

    const decoded = await jwt.verify(
      req.cookies.refereshtoken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    if (!decoded) {
      return res
        .status(400)
        .json({ sucess: false, data: null, Message: "Invalid Refresh Token" });
    }

    const user = await Users.findById(decoded.id);

    if (user.refreshToken !== req.cookies.refereshtoken) {
      return res
        .status(404)
        .json({ sucess: false, data: null, Message: "User Not Found." });
    }

    const { accessToken, refreshToken } = await tokenGenrater(user._id);

    const accOPNT = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 1000
    }

    const refOPNT = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 7 * 60 * 60 * 1000
    }

    return res
      .cookie("accessToken", accessToken, accOPNT)
      .cookie("refereshtoken", refreshToken, refOPNT)
      .status(200)
      .json({
        sucess: true,
        data: user,
        Message: "New Access Token Generated Successfully.",
      });
  }
  catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
};

const logout = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await Users.findByIdAndUpdate(
      { _id },
      {
        $unset: {
          refreshToken: 1
        }
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, data: null, Message: "User Not logouted." });
    }

    return res
      .clearCookie("accessToken")
      .clearCookie("refereshtoken")
      .status(200)
      .json({
        sucess: true,
        data: null,
        Message: "Logout Complete Sucessfully.",
      });

  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
}

const checkAuth = async (req, res) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
      return res.status(404).json({
        sucess: false,
        data: [],
        message: "Token not found",
      });
    }

    const decode = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (!decode) {
      return res.status(400).json({
        sucess: false,
        data: [],
        message: "Invaild Token",
      });
    }

    const user = await Users.findById(decode._id);

    if (!user) {
      return res.status(404).json({
        sucess: false,
        data: [],
        message: "user not found",
      });
    }

    return res.status(200).json({
      sucess: true,
      data: user,
      message: "user authentication complet",
    });

  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        data: null,
        Message: "Internal Server Error :" + error,
      });
  }
}

module.exports = {
  register,
  is_verify,
  login,
  gereratenewToken,
  logout,
  checkAuth
};