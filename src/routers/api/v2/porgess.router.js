const express = require('express');
const routers = express.Router()


routers.get("/allporgess", (req, res) => {
    res.status(200).json({Message : "All porgess data fechted"})
})

routers.get("/porgess", (req, res) => {
    res.status(200).json({Message : "porgess data fechted"})
})

routers.post("/addporgess", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "porgess data Added"})
})

routers.put("/updateporgess/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "porgess data Upadted"})
})

routers.delete("/deleteporgess/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "porgess data Deleted"})
})

module.exports = routers;