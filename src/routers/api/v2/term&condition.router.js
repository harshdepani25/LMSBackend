const express = require('express');
const routers = express.Router()


routers.get("/allterm&condtion", (req, res) => {
    res.status(200).json({Message : "All term&condtion data fechted"})
})

routers.get("/term&condtion", (req, res) => {
    res.status(200).json({Message : "term&condtion data fechted"})
})

routers.post("/addterm&condtion", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "term&condtion data Added"})
})

routers.put("/updateterm&condtion/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "term&condtion data Upadted"})
})

routers.delete("/deleteterm&condtion/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "term&condtion data Deleted"})
})

module.exports = routers;