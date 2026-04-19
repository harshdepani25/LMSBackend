const { default: mongoose, sanitizeFilter } = require("mongoose");

const quizContentSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Types.ObjectId,
            ref: "quiz",
            // required: true,
        },
        qustion: {
            type: String,
            trim: true
        },
        option: [{
            type: String,
            required: true,
        }],
        answer: {
            type: String,
            required: true,
        },
        mark: {
            type: String,
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

const QuizContent = mongoose.model("quizContent", quizContentSchema)

module.exports = QuizContent;