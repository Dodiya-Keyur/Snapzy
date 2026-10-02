const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes");
const postrouter = require("./routes/post.router");

const app = express();

app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/post", postrouter);



module.exports = app;