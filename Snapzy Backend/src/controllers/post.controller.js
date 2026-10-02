


const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const { uplodeFile, imagekit } = require('../services/storage.services')

async function createPost(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        // Upload image
        const result = await uplodeFile(req.file.buffer);

        // Get caption
        const { caption } = req.body;

        //Get User 
        const userId = req.user._id;

        // Create a post
        const post = await postModel.create({
            image: result.url,
            imageFileId: result.fileId,
            caption: caption,
            user: userId,
        });

        // Add post ID to user's post array
        await userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    post: post._id,
                },
            },
            { new: true }
        );

        res.status(201).json({
            message: "Post created successfully",
            post: post
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }


}

async function getAllPost(req, res) {

    try {
        const posts = await postModel
            .find()
            .populate("user");

        // posts.forEach((post) => {
        //     console.log(post, post.image, post.caption, post.user._id, post.user.username);
        // });

        res.status(200).json({
            message: "All posts fetched successfully",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function getPost(req, res) {

    try {

        //Get Post Id
        const postId = req.params.postid;

        // Find Post
        const post = await postModel.findById(postId);

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
            message: "Something went wrong",
            error: error.message
        });
    }


}

async function updatePost(req, res) {
    try {

        //Get Post Id
        const postId = req.params.postid;

        // Get caption
        const { caption } = req.body;

        const post = await postModel.findOneAndUpdate(
            { _id: postId },
            {
                caption: caption
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Post updated successfully",
            post
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function deletePost(req, res) {

    try {

        //Get Post Id
        const postId = req.params.postid;

        //Get Post By Id
        const post = await postModel
            .findOne({ _id: postId })
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

        if (userId.toString() !== postUserId.toString()) {
            return res.status(403).json({

                message: "You are not allowed to delete this post"
            });
        }

        // Delete image from ImageKit
        if (post.imageFileId) {
            await imagekit.files.delete(post.imageFileId);
        }

        // Delet Post
        const deletedpost = await postModel.findOneAndDelete(
            { _id: postId }
        );

        res.status(200).json({
            message: "Post Deleted successfully",
            deletedpost
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

module.exports = { createPost, getAllPost, updatePost, deletePost, getPost }