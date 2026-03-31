const express = require('express');
const { categoriescontroller } = require('../../../controller');
const auth = require('../../../middleware/auth');
const upload = require('../../../middleware/upload');
const routers = express.Router()


routers.get("/allcatgroy",categoriescontroller.getAllCategories)

routers.get("/catgroy/:id", categoriescontroller.getcategories)

routers.post("/addcategory",auth(['user']) ,upload.single('category_img') , categoriescontroller.addcategories)

routers.put("/updatecategory/:id", auth(['user']), upload.single('category_img') , categoriescontroller.updatecategories)

routers.delete("/deletecategory/:id",auth(['user']), categoriescontroller.deletcategories)

module.exports = routers;