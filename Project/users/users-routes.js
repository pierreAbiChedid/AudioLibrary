const express = require("express");

const userController = require("./users-controllers");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/send-reset-mail", userController.sendResetPasswordMail);
router.get("/checkMail/:token", userController.checkMailToken);



module.exports = router;
