const express = require("express");
const { upload } = require("./cloudinaryconfig"); 
const router = express.Router();
const User = require('../Models/UserSchema');


// Upload Profile Picture (Single File)
router.post("/upload/profile", upload.single("profile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const userId = req.body.userId; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { profileImage: req.file.path },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture uploaded and updated successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});



module.exports = router;


