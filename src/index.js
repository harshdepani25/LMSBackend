require('dotenv').config()

let app;

try {
    const path = require('path');
    const express = require('express');
    app = express();
    const cookieParser = require('cookie-parser');
    const passport = require('passport');
    const session = require('express-session');
    const cors = require('cors');

    console.log("✅ Basic modules loaded");

    // Test swagger load
    let swaggerDocument;
    try {
        swaggerDocument = require('./swagger-output.json');
        console.log("✅ Swagger loaded");
    } catch(e) {
        console.error("❌ Swagger load failed:", e.message);
    }

    // Test MongoStore
    let MongoStore;
    try {
        MongoStore = require('connect-mongo');
        console.log("✅ connect-mongo loaded");
    } catch(e) {
        console.error("❌ connect-mongo not found:", e.message);
    }

    app.use(cors({
        origin: 'https://lms-frontend-ten-steel.vercel.app',
        optionsSuccessStatus: 200,
        credentials: true
    }));

    app.use(express.json());
    app.use(cookieParser());

    app.use(session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    }));

    console.log("✅ Session middleware set");

    app.use(passport.initialize());
    app.use(passport.session());

    // Test GoogleProvider
    try {
        const GoogleProvider = require('./servicer/provider');
        GoogleProvider.GoogleProvider();
        console.log("✅ Google Provider loaded");
    } catch(e) {
        console.error("❌ GoogleProvider failed:", e.message);
    }

    // Test routers
    try {
        const routers1 = require('./routers/api/v2');
        app.use("/api/v2", routers1);
        console.log("✅ Routers loaded");
    } catch(e) {
        console.error("❌ Router load failed:", e.message);
    }

    // Test MongoDB
    try {
        const mongodb = require('./db/mongodb');
        mongodb().catch((err) => {
            console.error("❌ MongoDB connection failed:", err.message);
        });
        console.log("✅ MongoDB init called");
    } catch(e) {
        console.error("❌ MongoDB module failed:", e.message);
    }

    app.get("/", (req, res) => res.send("Welcome IN LMS Backend"));

    app.get("/debug", (req, res) => {
        res.json({
            status: "running",
            env_mongo: !!process.env.MONGODB_URI,
            env_session: !!process.env.SESSION_SECRET,
            env_google_id: !!process.env.GOOGLE_CLIENT_ID,
        });
    });

} catch(e) {
    console.error("💥 FATAL STARTUP ERROR:", e.message, e.stack);
    
    // Fallback app so Vercel doesn't fully crash
    const express = require('express');
    app = express();
    app.use((req, res) => {
        res.status(500).json({ 
            error: "Startup failed", 
            reason: e.message 
        });
    });
}

module.exports = app;