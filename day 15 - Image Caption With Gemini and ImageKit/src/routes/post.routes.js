const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models/user.model");

/* POST /api/posts  [Protected]   */

router.post("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
    req.user = user;
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token, Please Login Again",
    });
  }
});

module.exports = router;
