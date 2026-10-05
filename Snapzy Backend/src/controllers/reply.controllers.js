const mongoose = require("mongoose");

const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

const notificationService = require("../services/notification.service")

async function createReply(req, res) {
    try {

        // Get User ID
        const userId = req.user._id;

        // Validate User ID
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        // Get Parent Comment ID
        const parentCommentId = req.params.commentid;

        // Validate Parent Comment ID
        if (!mongoose.isValidObjectId(parentCommentId)) {
            return res.status(400).json({
                message: "Invalid Comment ID"
            });
        }

        // Check parent comment exists
        const parentComment = await commentModel.findById(parentCommentId);

        if (!parentComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }


        // Get reply text
        const { replytext } = req.body

        if (!replytext || !replytext.trim()) {
            return res.status(400).json({
                message: "Reply text is required"
            });
        }

        const postId = parentComment.post;


        // Create reply
        const reply = await commentModel.create({
            user: userId,
            post: postId,
            commentText: replytext,
            parentComment: parentCommentId
        });

        const commentUserId = parentComment.user;

        await notificationService.createNotification({
            recipient: commentUserId,
            sender: req.user._id,
            type: "reply",
            post: postId
        });

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await notificationService.createNotification({
            recipient: post.user,
            sender: req.user._id,
            type: "comment",
            post: postId
        });

        await postModel.findByIdAndUpdate(
            postId,
            {
                $inc: {
                    commentCount: 1
                }
            }
        );

        return res.status(201).json({
            message: "Reply created successfully",
            reply
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

async function getReplies(req, res) {
    try {

        const commentId = req.params.commentid;

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                message: "Invalid Comment ID"
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        const replies = await commentModel
            .find({
                parentComment: commentId
            })
            .populate("user", "_id username profilePicture")
            .sort({ createdAt: 1 });

        return res.status(200).json({
            message: "Replies fetched successfully",
            replies
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


module.exports = { createReply, getReplies };