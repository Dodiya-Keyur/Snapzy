const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");

// Controllers
const followControllers = require("../controllers/follow.controllers")


const followrouter = express.Router();

// Follow
followrouter.post("/follow/:userid", userAuth, followControllers.follow)
// UnFollow
followrouter.delete("/unfollow/:userid", userAuth, followControllers.unFollow)

module.exports = followrouter;