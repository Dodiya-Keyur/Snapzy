
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const { uplodeFile, imagekit } = require('../services/storage.services')

const DEFAULT_PROFILE_PICTURE =
    "https://i.pinimg.com/474x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg";


async function getUser(req, res) {

    try {

        const userId = req.user._id;

        const User = await userModel.findById(userId)

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            User
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function getUserPost(req, res) {

    try {

        const posts = await postModel
            .find({ user: req.user._id })
            .populate("user", "username profilePicture");

        res.status(200).json({
            message: "User All posts fetched successfully",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function getUserById(req, res) {

    try {

        const userId = req.params.userid;

        const User = await userModel
            .findById(userId)

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            User
        });



    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function getUserPostsById(req, res) {

    try {

        const userId = req.params.userid;

        const User = await userModel.findById(userId);

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        const posts = await postModel
            .find({ user: userId })
            .populate("user", "username profilePicture");

        res.status(200).json({
            message: "User Posts fetched successfully",
            posts
        });



    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function updateProfile(req, res) {

    try {

        const userId = req.user._id;

        const User = await userModel.findById(userId);

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        const { bio, username } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username is required"
            });
        }

        // Check if username is already used by another user
        const usernameExists = await userModel.findOne({ username: username });

        if (
            usernameExists &&
            usernameExists._id.toString() !== userId.toString()
        ) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            {
                bio,
                username
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.status(200).json({
            message: "User Profile Update successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }


}

async function updateProfilePicture(req, res) {

    try {

        const userId = req.user._id;

        const User = await userModel.findById(userId);

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }


        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        // Upload image
        const result = await uplodeFile(req.file.buffer);

        console.log(result)

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            {
                profilePicture: result.url,
                profilePictureFileId: result.fileId,
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.status(200).json({
            message: "User Profile Picture Update successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }


}

async function deleteProfilePicture(req, res) {

    try {

        const userId = req.user._id;

        const User = await userModel.findById(userId);

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        if (User.profilePictureFileId) {
            await imagekit.files.delete(User.profilePictureFileId);
        }

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            {
                profilePicture: DEFAULT_PROFILE_PICTURE,
                profilePictureFileId: null
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Profile Picture Deleted successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}

async function deleteUser(req, res) {

    try {

        // Find logged-in user
        const userId = req.user._id

        // Delete all posts created by this user
        await postModel.deleteMany({
            user: userId,
        });

        const User = userModel.findById(userId)

        if (!User) {
            return res.status(401).json({ message: "User Invalid" });
        }

        if (User.profilePictureFileId) {
            await imagekit.files.delete(user.profilePictureFileId);
        }

        // Delet User
        const deletedUser = await userModel.findOneAndDelete(
            { _id: userId }
        );

        res.status(200).json({
            message: "User Deleted successfully",
            deletedUser
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}



module.exports = { getUser, getUserPost, getUserById, updateProfile, updateProfilePicture, deleteProfilePicture, deleteUser, getUserPostsById }