const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        commentText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        
    },
    {
        timestamps: true,
    }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;