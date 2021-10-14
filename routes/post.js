// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { createPost, createComment } = require("../controller/post");

router.post("/create",createPost );
router.post("/comment",createComment );


// export
module.exports = router;
