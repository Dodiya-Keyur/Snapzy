const mongoose = require("mongoose");

const postModel = require("../models/post.model");
const userModel = require("../models/user.model");


async function search(req, res) {

    try {

        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const searchQuery = q.trim();

        const users = await userModel
            .find({
                username: {
                    $regex: searchQuery,
                    $options: "i"
                }
            })
            .select("username profilePicture bio")
            .limit(20);

        const posts = await postModel
            .find({
                $or: [
                    {
                        caption: {
                            $regex: searchQuery,
                            $options: "i"
                        }
                    },
                    {
                        hashtags: {
                            $regex: searchQuery,
                            $options: "i"
                        }
                    }
                ]
            })
            .populate("user", "username profilePicture")
            .limit(20);

        return res.status(200).json({
            success: true,
            data: {
                users,
                posts
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}


module.exports = { search }