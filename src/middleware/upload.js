import { error } from "console"

const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

        const ext = path.extname(file.originalname).toLowerCase();

        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.svg'){
            throw new Error("Please upload .png, .jpg, .jpeg, or .svg file ")
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

export const upload = multer({ storage: storage })

module.exports = upload