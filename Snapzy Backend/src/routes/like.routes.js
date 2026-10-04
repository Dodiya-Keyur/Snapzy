const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");

// Controllers
const likeControllers = require("../controllers/like.controllers")


const likerouter = express.Router();


likerouter.post("/:postid/like", userAuth, likeControllers.likePost);
likerouter.delete("/:postid/unlike", userAuth, likeControllers.unlikePost);

likerouter.get("/:postid/likes", userAuth, likeControllers.getPostLikes);

likerouter.get("/:postid/isliked", userAuth, likeControllers.userIsLiked);

module.exports = likerouter;