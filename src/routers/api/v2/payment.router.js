const express = require('express');
const routers = express.Router()


routers.get("/allpayment", (req, res) => {
    res.status(200).json({Message : "All payment data fechted"})
})

routers.get("/payment", (req, res) => {
    res.status(200).json({Message : "payment data fechted"})
})

routers.post("/addpayment", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "payment data Added"})
})

routers.put("/updatepayment/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "payment data Upadted"})
})

routers.delete("/deletepayment/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "payment data Deleted"})
})

module.exports = routers;