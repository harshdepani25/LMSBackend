const { default: mongoose, sanitizeFilter } = require("mongoose");

const coruseSchema = new mongoose.Schema(
    {
        categories_id: {
            
        },
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        desciption: {
            type: String,
        },
        fees: {
            type:Number,
            required: true,
        },
        duration: {
            type:String,
            required: true,
        },
        intrucotor_id: {
            required: true,
        },
        images: {
            type: String
        },
        perview_url: {
            type: String
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Coruse = mongoose.model("coruse", coruseSchema)

module.exports = Coruse;