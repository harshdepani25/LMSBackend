const express = require('express');
const routers = express.Router()


routers.get("/allwishlist", (req, res) => {
    res.status(200).json({Message : "All wishlist data fechted"})
})

routers.get("/wishlist", (req, res) => {
    res.status(200).json({Message : "wishlist data fechted"})
})

routers.post("/addwishlist", (req,res) => {
    console.log(req.body);
    res.status(200).json({Message : "wishlist data Added"})
})

routers.put("/updatewishlist/:id", (req,res) => {
    console.log(req.body, req.params.id);
    res.status(200).json({Message : "wishlist data Upadted"})
})

routers.delete("/deletewishlist/:id", (req,res) => {
    console.log(req.params.id);
    res.status(200).json({Message : "wishlist data Deleted"})
})

module.exports = routers;