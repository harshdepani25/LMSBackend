const express = require('express');
const routers = express.Router()


routers.get("/allcatgroy", (req, res) => {
    res.status(200).json({Message : "All Categroy data fechted"})
})

routers.get("/catgroy", (req, res) => {
    res.status(200).json({Message : "Categroy data fechted"})
})

routers.post("/addcategory", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "Categroy data Added"})
})

routers.put("/updatecategory/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "Categroy data Upadted"})
})

routers.delete("/deletecategory/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "Categroy data Deleted"})
})

module.exports = routers;