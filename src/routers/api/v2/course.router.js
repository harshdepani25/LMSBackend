const express = require('express');
const { coursecontroller } = require('../../../controller');
const routers = express.Router()


routers.get("/allcourse", coursecontroller.getAllCouser)

routers.get("/course/:id", coursecontroller.getCouser)

routers.post("/addcourse", coursecontroller.addCouser)

routers.put("/updatecourse/:id", coursecontroller.updateCouser)

routers.delete("/deletecourse/:id", coursecontroller.deletCouser)

module.exports = routers;