const express = require('express');
const { categoriescontroller } = require('../../../controller');
const routers = express.Router()


routers.get("/allcatgroy", categoriescontroller.getAllCategories)

routers.get("/catgroy/:id", categoriescontroller.getcategories)

routers.post("/addcategory",categoriescontroller.addcategories)

routers.put("/updatecategory/:id", categoriescontroller.updatecategories)

routers.delete("/deletecategory/:id", categoriescontroller.deletcategories)

module.exports = routers;