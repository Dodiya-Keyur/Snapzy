const mongoose = require("mongoose");

const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");

const notificationModel = require("../models/notification.model");

async function getNotifications(req, res) {

    try {

        const notifications = await notificationModel.find({
            recipient: req.user._id
        })
            .populate("sender", "username profilePicture")
            .populate("post", "caption image")
            .populate("comment", "text")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getUnreadCount(req, res) {

    try {

        const count = await notificationModel.countDocuments({
            recipient: req.user._id,
            isRead: false
        });

        return res.status(200).json({
            success: true,
            count
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function markAllAsRead(req, res) {

    try {

        await notificationModel.updateMany(
            {
                recipient: req.user._id,
                isRead: false
            },
            {
                $set: {
                    isRead: true
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteNotification(req, res) {
    try {
        const { notificationId } = req.params;

        const notification = await notificationModel.findOneAndDelete({
            _id: notificationId,
            recipient: req.user._id
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteAllNotifications(req, res) {
    try {

        const userId = req.user._id;

        const notification = await notificationModel.find({
            recipient: userId
        });

        if (notification.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        await notificationModel.deleteMany({
            recipient: userId
        });

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = { getNotifications, getUnreadCount, markAllAsRead, deleteNotification, deleteAllNotifications }