const express = require('express');
const routers = express.Router()


routers.get("/allblog", (req, res) => {
    res.status(200).json({Message : "All blog data fechted"})
})

routers.get("/blog", (req, res) => {
    res.status(200).json({Message : "blog data fechted"})
})

routers.post("/addblog", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "blog data Added"})
})

routers.put("/updateblog/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "blog data Upadted"})
})

routers.delete("/deleteblog/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "blog data Deleted"})
})

module.exports = routers;