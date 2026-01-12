const express = require('express');
const routers = express.Router()


routers.get("/allreview", (req, res) => {
    res.status(200).json({Message : "All review data fechted"})
})

routers.get("/review", (req, res) => {
    res.status(200).json({Message : "review data fechted"})
})

routers.post("/addreview", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "review data Added"})
})

routers.put("/updatereview/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "review data Upadted"})
})

routers.delete("/deletereview/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "review data Deleted"})
})

module.exports = routers;