const mongoose = require("mongoose");

const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");

const notificationService = require("../services/notification.service")

async function follow(req, res) {
    try {
        const userId = req.user._id;
        const followUserId = req.params.userid;

        if (!mongoose.isValidObjectId(followUserId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        if (userId.toString() === followUserId.toString()) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const user = await userModel
            .findById(followUserId)
            .select("_id");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await followModel.create({
            follower: userId,
            following: followUserId
        });

        await notificationService.createNotification({
            recipient: user._id,
            sender: req.user._id,
            type: "follow"
        });

        return res.status(201).json({
            message: "Follow successfully"
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already followed"
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

async function unFollow(req, res) {
    try {
        const userId = req.user._id;
        const followUserId = req.params.userid;

        if (!mongoose.isValidObjectId(followUserId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        const result = await followModel.findOneAndDelete({
            follower: userId,
            following: followUserId
        });

        if (!result) {
            return res.status(404).json({
                message: "You are not following this user"
            });
        }

        return res.status(200).json({
            message: "Unfollow successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = { follow, unFollow }