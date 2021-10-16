// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { createPost } = require("../controller/post");
const { createComment, getComment } = require("../controller/comment");

// routers
router.post("/create", createPost);
router.post("/comment/:id", createComment);
router.post("/get-comment/:id", getComment);

// export
module.exports = router;
