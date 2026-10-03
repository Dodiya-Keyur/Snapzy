const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Controllers
const userControllers = require("../controllers/user.controllers")


const userrouter = express.Router();

// Find User and User Post
userrouter.get("/get-user", userAuth, userControllers.getUser);
userrouter.get("/user/:userid", userAuth, userControllers.getUserById);
userrouter.get("/get-userposts", userAuth, userControllers.getUserPost);

// Profile 
userrouter.patch("/update-profile", userAuth, userControllers.updateProfile);

// Profile Picture
userrouter.patch("/update-profile-picture", userAuth, upload.single("image"), userControllers.updateProfilePicture);
userrouter.patch("/delete-profile-picture", userAuth, userControllers.deleteProfilePicture);

// Delete User 
userrouter.delete("/delete-user", userAuth, userControllers.deleteUser)

module.exports = userrouter;