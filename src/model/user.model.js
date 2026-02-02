const { default: mongoose, sanitizeFilter } = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type: String,
        trim:true,
        required:true,
    },
    password : {
        type: String,
        trim:true,
        required:true,
    },
    dob : {
        type: String,
        trim:true,
        required:true,
    },
    gender : {
        type: String,
        trim:true,
        required:true,
    },
    OTP : {
        type : Number
    },
    is_verify : {
        type : Boolean,
        default : false
    },
    is_active:{
        type:Boolean,
        default:true
    }
    },
    {
        timestamps:true,
        versionKey: false
    }
)

const users = mongoose.model("users", usersSchema)

module.exports = users;