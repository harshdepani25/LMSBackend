const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloudinary = async (file, folder) => {
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                file, {
                public_id: 'shoes',
                folder: folder
            }
            )
            .catch((error) => {
                console.log(error);
            });
        console.log(uploadResult);

        return {
            public_id: uploadResult.public_id,
            url: uploadResult.url
        }
    } catch (error) {
        console.log(error);

    }
}

const deletecloudinary = async () => {

}

module.exports = {
    uploadcloudinary,
    deletecloudinary
}