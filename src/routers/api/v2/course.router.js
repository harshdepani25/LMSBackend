const express = require('express');
const routers = express.Router()


routers.get("/allcourse", (req, res) => {
    res.status(200).json({Message : "All course data fechted"})
})

routers.get("/course", (req, res) => {
    res.status(200).json({Message : "course data fechted"})
})

routers.post("/addcourse", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "course data Added"})
})

routers.put("/updatecourse/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "course data Upadted"})
})

routers.delete("/deletecourse/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "course data Deleted"})
})

module.exports = routers;