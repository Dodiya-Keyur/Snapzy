const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware.js");
const { validateRegister, validateChangePassword } = require("../middleware/validateRegister.middleware.js")

// Controllers
const authController = require("../controllers/auth.controllers.js")


const authrouter = express.Router();

authrouter.post("/register", validateRegister, authController.registerUser);
authrouter.post("/login", authController.loginUser);
authrouter.post("/logout", userAuth, authController.logout);

authrouter.post("/change-password", userAuth, validateChangePassword, authController.changePassword)

module.exports = authrouter;