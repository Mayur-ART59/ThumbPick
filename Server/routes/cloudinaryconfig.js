const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
dotenv.config();
const multer = require('multer');



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", 
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
  
  const upload = multer({ storage: storage });
  module.exports = { cloudinary, upload };

