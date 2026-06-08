require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GoogleProvider = require('./servicer/provider');
const createSocketIO = require('./servicer/socketIO');
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

// ✅ Session with MongoStore v4
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
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

// ✅ Socket.IO only on local (not Vercel)
if (!process.env.VERCEL) {
    createSocketIO();
}

// ✅ Routes
const routers1 = require('./routers/api/v2');
app.use("/api/v2", routers1);

// ✅ MongoDB connect
const mongodb = require('./db/mongodb');
mongodb().catch((err) => {
    console.error("Failed to connect to MongoDB on startup:", err);
});

// ✅ Home route
app.get("/", (req, res) => {
    res.send("Welcome IN LMS Backend");
});

// ✅ Debug route (remove after fixing)
app.get("/debug", (req, res) => {
    res.json({
        status: "running",
        env_mongo: !!process.env.MONGODB_URI,
        env_session: !!process.env.SESSION_SECRET,
        env_google_id: !!process.env.GOOGLE_CLIENT_ID,
        env_google_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    });
});

module.exports = app;