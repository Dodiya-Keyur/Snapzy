const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Controllers
const postControllers = require("../controllers/post.controller")


const postrouter = express.Router();

// Create Post
postrouter.post("/create-post", userAuth, upload.single("image"), postControllers.createPost);

// Get Post
postrouter.get("/get-allpost", userAuth, postControllers.getAllPost);
postrouter.get("/getpost/:postid", userAuth, postControllers.getPost);

// Update Post
postrouter.patch("/update-post/:postid", userAuth, postControllers.updatePost);

// Delete Post
postrouter.delete("/delete-post/:postid", userAuth, postControllers.deletePost);

module.exports = postrouter;