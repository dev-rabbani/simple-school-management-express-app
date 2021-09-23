const express = require("express");
const router = express.Router();

const auth =  require('../middleware/auth');
const roleBasePermit =  require('../middleware/roleBasePermit');

const { getAllUsers, userRegister, userLogin } = require("../controller/user");

router.get("/get-all",auth,roleBasePermit(['student']), getAllUsers);
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
