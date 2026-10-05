const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// Routers 
const authRouter = require("./routes/auth.routers");
const postrouter = require("./routes/post.routers");
const userrouter = require("./routes/user.routers");
const likerouter = require("./routes/like.routers");
const followrouter = require("./routes/follow.routers");
const commentrouter = require("./routes/comment.routers");
const searchrouter = require("./routes/search.routers");

const app = express();

app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posts", postrouter);
app.use("/api/users", userrouter);
app.use("/api/posts", likerouter);
app.use("/api/follows", followrouter);
app.use("/api/comments", commentrouter);
app.use("/search", searchrouter);

module.exports = app;