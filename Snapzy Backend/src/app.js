const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes");
const postrouter = require("./routes/post.router");
const userrouter = require("./routes/user.router");
const likerouter = require("./routes/like.routes");
const followrouter = require("./routes/follow.routers");

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

module.exports = app;