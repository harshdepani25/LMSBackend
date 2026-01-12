const express = require('express');
const routers = express.Router()


routers.get("/alluser", (req, res) => {
    res.status(200).json({Message : "All user data fechted"})
})

routers.get("/user", (req, res) => {
    res.status(200).json({Message : "user data fechted"})
})

routers.post("/adduser", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "user data Added"})
})

routers.put("/updateuser/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "user data Upadted"})
})

routers.delete("/deleteuser/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "user data Deleted"})
})

module.exports = routers;