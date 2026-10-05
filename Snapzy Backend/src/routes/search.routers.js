const express = require("express");


const searchControllers = require("../controllers/search.controllers");
const userAuth = require("../middleware/auth.middleware");


const searchrouter = express.Router();



searchrouter.get("/", userAuth, searchControllers.search);



module.exports = searchrouter;