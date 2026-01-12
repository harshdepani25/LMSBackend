const express = require('express');
const routers = express.Router()


routers.get("/allenrollment", (req, res) => {
    res.status(200).json({Message : "All enrollment data fechted"})
})

routers.get("/enrollment", (req, res) => {
    res.status(200).json({Message : "enrollment data fechted"})
})

routers.post("/addenrollment", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "enrollment data Added"})
})

routers.put("/updateenrollment/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "enrollment data Upadted"})
})

routers.delete("/deleteenrollment/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "enrollment data Deleted"})
})

module.exports = routers;