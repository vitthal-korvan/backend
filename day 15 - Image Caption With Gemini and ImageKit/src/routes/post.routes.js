const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

/* POST /api/posts  [Protected]   */

router.post(
  "/",
  authMiddleware /* req.user = userData */,
  upload.single=('image'),
  createPostController
);

module.exports = router;
