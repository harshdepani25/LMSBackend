require('dotenv').config()
const express = require('express');
const app = express()

app.use(express.json())

const routers1 = require('./routers/api/v2');
const mongodb = require('./db/mongodb');
app.use("/api/v2", routers1);

mongodb();

app.listen(process.env.PORT, () => {
    console.log("Server Started at 3030");
})