const express = require("express");

const userController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);


module.exports = router;