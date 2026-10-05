const mongoose = require("mongoose");

const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");


const notificationService = require("../services/notification.service")


async function createComment(req, res) {

    try {

        // Get User ID
        const userId = req.user._id;

        // Validate User ID
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        // Get Post ID
        const postId = req.params.postid;

        // Validate Post ID
        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        // Check if post exists
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const { commentText } = req.body;

        if (!commentText || !commentText.trim()) {
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        // Create a Comment
        const comment = await commentModel.create({
            user: userId,
            post: postId,
            commentText
        })

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

        res.status(201).json({
            message: "Comment created successfully",
            comment
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}

async function getComments(req, res) {
    try {

        // Get Post ID
        const postId = req.params.postid;

        // Validate Post ID
        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        // Check if post exists
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const comments = await commentModel
            .find({ post: postId, parentComment: null })
            .populate("user", "_id username profilePicture")

        res.status(200).json({
            message: "Post comments fetched successfully",
            comments
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

async function updateComment(req, res) {

    try {

        // Get User ID
        const userId = req.user._id;

        // Validate User ID
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        // Get Comment ID
        const commentid = req.params.commentid;

        // Validate Comment ID
        if (!mongoose.isValidObjectId(commentid)) {
            return res.status(400).json({
                message: "Invalid Comment ID"
            });
        }

        // Check if Comment exists
        const comment = await commentModel
            .findById(commentid)
            .populate("post", "_id user");

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own comment",
            });
        }

        const { commentText } = req.body

        if (!commentText) {
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        // Update comment
        const updatedComment = await commentModel.findByIdAndUpdate(
            commentid,
            { commentText: commentText },
            { new: true }
        );

        return res.status(200).json({
            message: "Comment updated successfully",
            comment: updatedComment
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}

async function deleteComment(req, res) {

    try {

        // Get User ID
        const userId = req.user._id;

        // Validate User ID
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        // Get Comment ID
        const commentid = req.params.commentid;

        // Validate Comment ID
        if (!mongoose.isValidObjectId(commentid)) {
            return res.status(400).json({
                message: "Invalid Comment ID"
            });
        }

        // Check if Comment exists
        const comment = await commentModel
            .findById(commentid)
            .populate("post", "_id user");


        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Check permission
        const isCommentOwner = comment.user.toString() === userId.toString();

        const isPostOwner = comment.post.user.toString() === userId.toString();

        if (!isCommentOwner && !isPostOwner) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own comment or comments on your post"
            });
        }

        // Delete comment
        await commentModel.deleteMany({
                    $or: [
                        { _id: commentid },
                        { parentComment: commentid }
                    ]
                });

        const postId = comment.post._id;

        await postModel.findByIdAndUpdate(
            postId,
            {
                $inc: {
                    commentCount: -1
                }
            }
        );

        res.status(200).json({
            message: "Comment Delete successfully",
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}


module.exports = { createComment, getComments, updateComment, deleteComment }