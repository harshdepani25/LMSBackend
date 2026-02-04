const express = require('express');
const { userscontroller } = require('../../../controller');
const routers = express.Router()

routers.post("/register", userscontroller.register)
routers.post("/login", userscontroller.login)
routers.post("/is_verify", userscontroller.is_verify)
routers.post("/gereratenewToken", userscontroller.gereratenewToken)
routers.post("/logout", userscontroller.logout)

module.exports = routers;