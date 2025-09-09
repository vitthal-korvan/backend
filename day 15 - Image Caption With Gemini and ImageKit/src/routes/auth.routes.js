const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const router = express.Router();

/*
 POST - /register
 POST - /login
 GET - /users [Protected]
 
 */

router.post("/register", async(req, res) => {
  const { username, password } = req.body;

  const exitingUser = await userModel.findOne({
      username
  })
  if (exitingUser) {
      return res.status(409).json({
            message:"Username Already Exist"
      })
  }

  const user = await userModel.create({
      username,password
  })

  const token = jwt.sign({
      id:user._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token)
  res.status(201).json({
      message:"User Created Successfully",
      user
  })
});

module.exports = router;
