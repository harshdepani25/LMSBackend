require('dotenv').config()

const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Step 0 OK - Express works"));

// ---- Test each module one by one ----

let step = 0;

try {
    step = 1;
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const cors = require('cors');
    console.log("✅ Step 1: Basic modules OK");

    step = 2;
    const session = require('express-session');
    console.log("✅ Step 2: express-session OK");

    step = 3;
    const MongoStore = require('connect-mongo');
    console.log("✅ Step 3: connect-mongo OK");

    // 🔍 ADD THESE LOGS
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
    console.log("MONGODB_URI value:", process.env.MONGODB_URI); // see actual value

    step = 4;
    const passport = require('passport');
    console.log("✅ Step 4: passport OK");

    step = 5;
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./swagger-output.json');
    console.log("✅ Step 5: swagger OK");

    step = 6;
    const GoogleProvider = require('./servicer/provider');
    console.log("✅ Step 6: GoogleProvider module loaded");

    step = 7;
    GoogleProvider.GoogleProvider();
    console.log("✅ Step 7: GoogleProvider() called OK");

    step = 8;
    const routers1 = require('./routers/api/v2');
    console.log("✅ Step 8: Routers loaded OK");

    step = 9;
    const mongodb = require('./db/mongodb');
    console.log("✅ Step 9: MongoDB module loaded OK");

    // ---- All OK, setup full app ----
    const path2 = require('path');
// 🔍 Debug check
app.get("/check-env", (req, res) => {
    res.json({
        MONGODB_URI: process.env.MONGODB_URI || "❌ NOT SET",
        SESSION_SECRET: process.env.SESSION_SECRET || "❌ NOT SET",
    });
});
    app.use(cors({
        origin: 'https://lms-frontend-ten-steel.vercel.app',
        optionsSuccessStatus: 200,
        credentials: true
    }));

    app.use('/public', express.static(path2.join(__dirname, 'public')));
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

    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api/v2", routers1);

    mongodb().catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
    });

    app.get("/debug", (req, res) => {
        res.json({
            status: "✅ All systems OK",
            step_reached: step,
            env_mongo: !!process.env.MONGODB_URI,
            env_session: !!process.env.SESSION_SECRET,
            env_google_id: !!process.env.GOOGLE_CLIENT_ID,
            env_google_secret: !!process.env.GOOGLE_CLIENT_SECRET,
        });
    });

    console.log("✅ All steps passed!");

    // ✅ Add this before MongoStore.create()
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not set!");
    }

    app.use(session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    }));

} catch (e) {
    console.error(`💥 CRASHED AT STEP ${step}:`, e.message);
    console.error(e.stack);

    app.get("/debug", (req, res) => {
        res.status(500).json({
            crashed_at_step: step,
            error: e.message,
            stack: e.stack
        });
    });
}

module.exports = app;