const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        // User who created the post
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Post image
        image: {
            type: String,
            required: true,
        },
        imageFileId: {
            type: String,
            default: null,
            select: false
        },

        // Post caption
        caption: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        // Like on Post 
        likesCount: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true,
    }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;