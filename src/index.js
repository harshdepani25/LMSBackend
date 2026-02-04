require('dotenv').config()
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const routers1 = require('./routers/api/v2');
const mongodb = require('./db/mongodb');
app.use("/api/v2", routers1);

mongodb();

app.listen(process.env.PORT, () => {
    console.log("Server Started at 3030");
})