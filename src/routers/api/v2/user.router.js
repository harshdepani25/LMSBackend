const express = require('express');
const { userscontroller } = require('../../../controller');
const passport = require('passport');
const routers = express.Router()

routers.post("/register", userscontroller.register)
routers.post("/login", userscontroller.login)
routers.post("/is_verify", userscontroller.is_verify)
routers.post("/gereratenewToken", userscontroller.gereratenewToken)
routers.post("/logout", userscontroller.logout)
routers.get("/checkAuth", userscontroller.checkAuth)


routers.get('/auth/google',
  passport.authenticate('google', { scope: ['profile' , 'email'] }));

routers.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = routers;