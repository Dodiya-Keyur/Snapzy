const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function uploadFile(buffer, mimetype) {

    const extension = mimetype.split("/")[1];

    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: `image-${Date.now()}.${extension}`,
    });

    return result;
}

module.exports = {
    imagekit,
    uploadFile
};