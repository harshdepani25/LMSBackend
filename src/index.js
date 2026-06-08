require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GoogleProvider = require('./servicer/provider');
const createSocketIO = require('./servicer/socketIO');
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // ✅ fixed path

app.use(cors({
    origin: 'https://lms-frontend-ten-steel.vercel.app',
    optionsSuccessStatus: 200,
    credentials: true
}))

// ✅ Fixed static path
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

// ✅ Fixed session with MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

GoogleProvider.GoogleProvider();

if (!process.env.VERCEL) {
    createSocketIO();
}

const routers1 = require('./routers/api/v2');
const mongodb = require('./db/mongodb');

app.use("/api/v2", routers1);

mongodb().catch((err) => {
    console.error("Failed to connect to MongoDB on startup:", err);
});

app.get("/", (req, res) => {
    res.send("Welcome IN LMS Backend")
})

module.exports = app;