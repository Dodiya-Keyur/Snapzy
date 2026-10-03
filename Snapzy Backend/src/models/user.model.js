const mongoose = require("mongoose");

const DEFAULT_PROFILE_PICTURE =
    "https://i.pinimg.com/474x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg";


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    profilePicture: {
        type: String,
        default: DEFAULT_PROFILE_PICTURE,
    },

    profilePictureFileId: {
        type: String,
        default: null,
    },

    bio: {
        type: String,
        maxlength: 150,
        default: "",
    },

    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

},
    {
        timestamps: true,
    }
);


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;