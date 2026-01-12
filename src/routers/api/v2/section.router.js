const express = require('express');
const routers = express.Router()


routers.get("/allsection", (req, res) => {
    res.status(200).json({Message : "All section data fechted"})
})

routers.get("/section", (req, res) => {
    res.status(200).json({Message : "section data fechted"})
})

routers.post("/addsection", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "section data Added"})
})

routers.put("/updatesection/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "section data Upadted"})
})

routers.delete("/deletesection/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "section data Deleted"})
})

module.exports = routers;