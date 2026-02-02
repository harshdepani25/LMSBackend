const express = require('express');
const { userscontroller } = require('../../../controller');
const routers = express.Router()

routers.post("/register", userscontroller.register)

module.exports = routers;