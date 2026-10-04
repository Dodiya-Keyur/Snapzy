const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");

// Controllers
const likeControllers = require("../controllers/like.controllers")


const likerouter = express.Router();


likerouter.post("/post/:postid/like", userAuth, likeControllers.likePost);
likerouter.delete("/post/:postid/dislike", userAuth, likeControllers.disLikePost);

likerouter.get("/post/:postid/likes", userAuth, likeControllers.getPostLikes);

likerouter.get("/post/:postid/isliked", userAuth, likeControllers.userIsLiked);

module.exports = likerouter;