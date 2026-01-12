const express = require('express');
const routers = express.Router()


routers.get("/allquiz_content", (req, res) => {
    res.status(200).json({Message : "All quiz_content data fechted"})
})

routers.get("/quiz_content", (req, res) => {
    res.status(200).json({Message : "quiz_content data fechted"})
})

routers.post("/addquiz_content", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "quiz_content data Added"})
})

routers.put("/updatequiz_content/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "quiz_content data Upadted"})
})

routers.delete("/deletequiz_content/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "quiz_content data Deleted"})
})

module.exports = routers;