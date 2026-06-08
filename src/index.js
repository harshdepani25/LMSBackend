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

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// ✅ CORS
app.use(cors({
    origin: 'https://lms-frontend-ten-steel.vercel.app',
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
        mongoUrl: process.env.MONGODB_URI
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

let isDbConnected = false;
let dbError = null;

const mongodb = require('./db/mongodb');
mongodb()
    .then(() => {
        isDbConnected = true;
        console.log("✅ MongoDB Ready");
    })
    .catch((err) => {
        dbError = err.message;
        console.error("❌ MongoDB Failed:", err.message);
    });

// ✅ Block requests until DB is ready - show real error
app.use((req, res, next) => {
    if (!isDbConnected) {
        return res.status(503).json({
            success: false,
            connected: isDbConnected,
            error: dbError || "Still connecting...",  // ✅ shows real error
            uri_set: !!process.env.MONGODB_URI,
            uri_preview: process.env.MONGODB_URI
                ? process.env.MONGODB_URI.substring(0, 30) + "..."  // first 30 chars only
                : "NOT SET"
        });
    }
    next();
});

// ✅ Routes
const routers1 = require('./routers/api/v2');
app.use("/api/v2", routers1);

// ✅ Home route
app.get("/", (req, res) => {
    res.send("Welcome IN LMS Backend");
});

module.exports = app;