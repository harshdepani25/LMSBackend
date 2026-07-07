require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GoogleProvider = require('./servicer/provider');
const cors = require('cors');
const mongodb = require('./db/mongodb');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// ✅ CORS
app.use(cors({
    origin: 'https://lms-harshdepani.vercel.app',
    // origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}));

// ✅ Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// ✅ Body & Cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Session with MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600
    })
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Google OAuth
GoogleProvider.GoogleProvider();

// ✅ Socket.IO only on local
if (!process.env.VERCEL) {
    const createSocketIO = require('./servicer/socketIO');
    createSocketIO();
}

// ✅ KEY FIX — await MongoDB on every request
app.use(async (req, res, next) => {
    try {
        await mongodb(); // ✅ waits for connection before proceeding
        next();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        return res.status(503).json({
            success: false,
            message: "Database connection failed: " + err.message
        });
    }
});

// ✅ Routes — AFTER the mongodb middleware
const routers1 = require('./routers/api/v2');
app.use("/api/v2", routers1);

// ✅ Home route
app.get("/", (req, res) => {
    res.send("Welcome IN LMS Backend");
});

module.exports = app;