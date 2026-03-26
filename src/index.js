require('dotenv').config()
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
const passport = require('passport');
const GoogleProvider = require('./servicer/provider');
const createSocketIO = require('./servicer/socketIO');
const cors = require('cors')

app.use(cors({
    origin: 'https://lms-frontend-ten-steel.vercel.app',
    // origin:"http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}))

app.use('/public', express.static('public'))

app.use(express.json())
app.use(cookieParser())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

GoogleProvider.GoogleProvider();
// GoogleProvider.FacebookProvider();
createSocketIO();

const routers1 = require('./routers/api/v2');

const mongodb = require('./db/mongodb');
app.use("/api/v2", routers1);

mongodb();

app.get("/", (req, res) => {
    res.send("Welcome IN LMS Backend")
}
)

// app.listen(process.env.PORT, () => {
//     console.log("Server Started at 3030");
// })

module.exports = app;