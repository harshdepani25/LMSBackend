const express = require('express');
const routers = express.Router()


routers.get("/allquiz", (req, res) => {
    res.status(200).json({Message : "All quiz data fechted"})
})

routers.get("/quiz", (req, res) => {
    res.status(200).json({Message : "quiz data fechted"})
})

routers.post("/addquiz", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "quiz data Added"})
})

routers.put("/updatequiz/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "quiz data Upadted"})
})

routers.delete("/deletequiz/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "quiz data Deleted"})
})

module.exports = routers;