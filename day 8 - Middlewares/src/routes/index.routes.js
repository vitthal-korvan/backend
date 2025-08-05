const express = require("express");

const router = express.Router();

router.use((req, res, next)=>{
      console.log("This middleware is between router ans API");
      next()
})

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
