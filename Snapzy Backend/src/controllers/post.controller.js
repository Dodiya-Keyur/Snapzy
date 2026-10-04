const mongoose = require("mongoose");

const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const { uploadFile, imagekit } = require('../services/storage.services')

async function createPost(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        // Upload image
        const result = await uploadFile(
            req.file.buffer,
            req.file.mimetype
        );

        // Get caption
        const { caption } = req.body;

        //Get User 
        const userId = req.user._id;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        // Create a post
        const post = await postModel.create({
            image: result.url,
            imageFileId: result.fileId,
            caption: caption,
            user: userId,
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Post already Created"
            });
        }

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }


}

async function getAllPost(req, res) {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;


        const posts = await postModel
            .find()
            .populate("user", "username profilePicture")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Posts fetched successfully",
            page,
            limit,
            posts
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }

}

async function getPost(req, res) {

    try {

        //Get Post Id
        const postId = req.params.postid;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        // Find Post
        const post = await postModel
            .findById(postId)
            .populate("user", "username profilePicture");


        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post found successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }


}

async function updatePost(req, res) {
    try {

        //Get Post Id
        const postId = req.params.postid;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        // Get caption
        const { caption } = req.body;

        const UpdatedPost = await postModel.findOneAndUpdate(
            {
                _id: postId,
                user: req.user._id
            },
            {
                caption
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!UpdatedPost) {
            return res.status(404).json({
                message: "Post not found or you are not allowed to update it"
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            UpdatedPost
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}

async function deletePost(req, res) {

    try {

        //Get Post Id
        const postId = req.params.postid;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        //Get Post By Id
        const post = await postModel
            .findOne({ _id: postId })
            .select("+imageFileId")
            .populate("user", "_id");

        // Check post exists
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Get post creator
        const postUserId = post.user._id;

        // Check whether logged-in user created this post
        const userId = req.user._id

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        if (userId.toString() !== postUserId.toString()) {
            return res.status(403).json({

                message: "You are not allowed to delete this post"
            });
        }

        // Delete image from ImageKit
        if (post.imageFileId) {
            await imagekit.files.delete(post.imageFileId);
        }

        // Delete all likes of Post
        await likeModel.deleteMany({
            post: postId
        });

        // Delet Post
        await postModel.findOneAndDelete(
            { _id: postId }
        );

        res.status(200).json({
            message: "Post Deleted successfully",
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}

module.exports = { createPost, getAllPost, updatePost, deletePost, getPost }