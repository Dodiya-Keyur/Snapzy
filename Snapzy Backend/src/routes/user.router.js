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
userrouter.delete("/me/delete-user", userAuth, userControllers.deleteUser)



// USER APIs
// │
// ├── Profile
// │   ├── GET    /api/user/me          => Complet
// │   ├── GET    /api/user/:userid          => Complet
// │   ├── PATCH  /api/user/update-profile          => Complet
// │   ├── PATCH  /api/user/profile-picture          => Complet
// │   └── DELETE /api/user/profile-picture          => Complet
// │
// ├── Search
// │   └── GET    /api/user/search
// │
// ├── Follow
// │   ├── POST   /api/user/:userid/follow 
// │   └── DELETE /api/user/:userid/follow
// │
// ├── Followers
// │   ├── GET    /api/user/:userid/followers
// │   └── GET    /api/user/:userid/following
// │
// └── Posts
//     └── GET    /api/user/:userid/posts           => Complet

module.exports = userrouter;