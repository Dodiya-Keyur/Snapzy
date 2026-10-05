const notificationModel = require("../models/notification.model");


async function createNotification({
    recipient,
    sender,
    type,
    post = null,
    comment = null
}) {

    if (recipient.toString() === sender.toString()) {
        return;
    }

    return await notificationModel.create({
        recipient,
        sender,
        type,
        post,
        comment
    });
}

module.exports = {
    createNotification
};