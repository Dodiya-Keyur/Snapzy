const commentrouter = require("express").Router();

// MiddleWare
const userAuth = require("../middleware/auth.middleware");

// Controllers
const commentControllers = require("../controllers/comment.controllesr");
const replyControllers = require("../controllers/reply.controllers")

commentrouter.post("/posts/:postid/comments", userAuth, commentControllers.createComment);

commentrouter.get("/posts/:postid/comments", userAuth, commentControllers.getComments);

commentrouter.patch("/comment/:commentid", userAuth, commentControllers.updateComment);

commentrouter.delete("/comment/:commentid", userAuth, commentControllers.deleteComment);


commentrouter.post("/comment/:commentid/replies", userAuth, replyControllers.createReply);

commentrouter.get("/comment/:commentid/replies", userAuth, replyControllers.getReplies);

module.exports = commentrouter;


