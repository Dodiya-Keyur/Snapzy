const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Controllers
const userControllers = require("../controllers/user.controllers")


const userrouter = express.Router();


// Find User and User Post
userrouter.get("/me", userAuth, userControllers.getUser);
userrouter.get("/:userid", userAuth, userControllers.getUserById);

// Find User Post
userrouter.get("/me/posts", userAuth, userControllers.getUserPost);
userrouter.get("/:userid/posts", userAuth, userControllers.getUserPostsById);

// Profile 
userrouter.patch("/me/update-profile", userAuth, userControllers.updateProfile);

// Profile Picture
userrouter.patch("/me/update-profile-picture", userAuth, upload.single("image"), userControllers.updateProfilePicture);
userrouter.delete("/me/delete-profile-picture", userAuth, userControllers.deleteProfilePicture);

// Delete User 
userrouter.delete("/me/delete-user", userAuth, userControllers.deleteUser);

// Liked Posts
userrouter.get("/me/liked-post", userAuth, userControllers.getLikedPost);

// Get all Saved Post
userrouter.get("/me/saved-posts", userAuth, userControllers.getSavedPost);


// Get Followers
userrouter.get("/me/followers", userAuth, userControllers.getFollowers);
// Get Following
userrouter.get("/me/following", userAuth, userControllers.getFollowing);



module.exports = userrouter;