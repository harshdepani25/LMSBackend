const express = require('express');
const routers = express.Router()


routers.get("/allcontent", (req, res) => {
    res.status(200).json({Message : "All content data fechted"})
})

routers.get("/content", (req, res) => {
    res.status(200).json({Message : "content data fechted"})
})

routers.post("/addcontent", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "content data Added"})
})

routers.put("/updatecontent/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "content data Upadted"})
})

routers.delete("/deletecontent/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "content data Deleted"})
})

module.exports = routers;