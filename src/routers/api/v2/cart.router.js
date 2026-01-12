const express = require('express');
const routers = express.Router()


routers.get("/allcart", (req, res) => {
    res.status(200).json({Message : "All cart data fechted"})
})

routers.get("/cart", (req, res) => {
    res.status(200).json({Message : "cart data fechted"})
})

routers.post("/addcart", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "cart data Added"})
})

routers.put("/updatecart/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "cart data Upadted"})
})

routers.delete("/deletecart/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "cart data Deleted"})
})

module.exports = routers;