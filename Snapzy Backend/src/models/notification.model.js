const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "follow",
                "like",
                "comment",
                "reply",
            ],
            required: true,
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: null,
        },

        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;