const  {registerController,loginController}= require("../controllers/auth.controller")

const express = require("express");

const router = express.Router();

/*
 POST - /register
 POST - /login
 GET - /users [Protected]
 */


router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
