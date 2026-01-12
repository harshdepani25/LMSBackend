const express = require('express');
const routers = express.Router()


routers.get("/allcretificate", (req, res) => {
    res.status(200).json({Message : "All cretificate data fechted"})
})

routers.get("/cretificate", (req, res) => {
    res.status(200).json({Message : "cretificate data fechted"})
})

routers.post("/addcretificate", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "cretificate data Added"})
})

routers.put("/updatecretificate/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "cretificate data Upadted"})
})

routers.delete("/deletecretificate/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "cretificate data Deleted"})
})

module.exports = routers;