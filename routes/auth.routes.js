const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth.controller")

// user login
router.route("/login").post(authController.loginController);

// user register
router.route("/register").post();




module.exports = router;
