const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies.token;

        // 2. Check token exists
        if (!token) {
            
            return res.status(401).json({
                message: "You are not logged in"
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 4. Find user
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // 5. Store user in request
        req.user = user;

        // 6. Continue to next middleware/controller
        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
