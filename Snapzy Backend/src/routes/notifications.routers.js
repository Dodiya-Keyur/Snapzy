const express = require("express");

// MiddleWare
const userAuth = require("../middleware/auth.middleware");

// Controllers
const notificationControllers = require("../controllers/notification.controllers")


const notificationrouter = express.Router();


notificationrouter.get("/notifications", userAuth, notificationControllers.getNotifications);

notificationrouter.get("/notifications/unread-count", userAuth, notificationControllers.getUnreadCount);

notificationrouter.patch("/notifications/read-all", userAuth, notificationControllers.markAllAsRead);

notificationrouter.delete("/delete-notifications/:notificationId", userAuth, notificationControllers.deleteNotification);

notificationrouter.delete("/notifications/delete-notifications", userAuth, notificationControllers.deleteAllNotifications);


module.exports = notificationrouter;