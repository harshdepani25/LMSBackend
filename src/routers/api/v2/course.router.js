const express = require('express');
const { coursecontroller } = require('../../../controller');
const routers = express.Router();
const upload = require('../../../middleware/upload');


routers.get("/allcourse", coursecontroller.getAllCouser)

routers.get("/getcourse/:id", coursecontroller.getCouser)

routers.post("/addcourse", upload.single('course_img')  , coursecontroller.addCouser)

routers.put("/updatecourse/:id", upload.single('course_img'), coursecontroller.updateCouser)

routers.delete("/deletecourse/:id", coursecontroller.deletCouser)

routers.put("/updateCouserStauts/:id", upload.single('course_img'), coursecontroller.updateCouserStauts )

module.exports = routers;

