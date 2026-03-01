const express = require('express');
const { categoriescontroller } = require('../../../controller');
const auth = require('../../../middleware/auth');
const { upload } = require('../../../middleware/upload');
const routers = express.Router()


routers.get("/allcatgroy",categoriescontroller.getAllCategories)

routers.get("/catgroy/:id", categoriescontroller.getcategories)

routers.post("/addcategory", upload.single('poster') , categoriescontroller.addcategories)

routers.put("/updatecategory/:id", categoriescontroller.updatecategories)

routers.delete("/deletecategory/:id", categoriescontroller.deletcategories)

module.exports = routers;