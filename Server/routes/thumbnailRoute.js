const express = require("express");
const { upload } = require("../config/cloudinaryConfig"); 
const router = express.Router();
const Thumbnail = require("../Models/Thumbnails");
const Like = require("../Models/Likes");


// Upload Thumbnails
router.post("/upload/thumbnails", upload.array("thumbnails", 5), async (req, res) => {
    try {
      const { userId, title } = req.body;
  
      if (!userId || !title) {
        return res.status(400).json({ message: "User ID and title are required" });
      }
  
      if (!req.files || req.files.length < 2) {
        return res.status(400).json({ message: "Please upload at least one file" });
      }
      const imageUrls = req.files.map((file) => file.path);
      const newThumbnail = new Thumbnail({
        userId,
        title,
        images: imageUrls,
        likes: [],
      });
      await newThumbnail.save();
      res.status(201).json({
        message: "Thumbnails uploaded and saved successfully",
        thumbnail: newThumbnail,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ 
        message: "Upload failed", 
        error: error.message || "Unknown error occurred"
      });
    }
  });
  
  
  
  // Fetch all thumbnails with uploader info
  router.get("/GetThumbnails", async (req, res) => {
    try {
        const thumbnails = await Thumbnail.find()
            .populate("userId", "name profileImage")
            .sort({ createdAt: -1 });

        const formattedData = await Promise.all(
            thumbnails.map(async (thumbnail) => {
                const likes = await Like.find({ thumbnailId: thumbnail._id });

                // Determine the most liked image index
                const likeCounts = {};
                likes.forEach((like) => {
                    likeCounts[like.imageIndex] = (likeCounts[like.imageIndex] || 0) + 1;
                });

                const mostLikedImageIndex = Object.keys(likeCounts).reduce((a, b) =>
                    likeCounts[a] > likeCounts[b] ? a : b,
                    0
                );

                return {
                    _id: thumbnail._id,
                    title: thumbnail.title,
                    images: thumbnail.images,
                    uploaderName: thumbnail.userId?.name || "Unknown",
                    uploaderImage: thumbnail.userId?.profileImage || null,
                    uploadDate: thumbnail.createdAt,
                    likes: likes.map((like) => like.userId.toString()),
                    likeCount: likes.length,
                    mostLikedImageIndex: parseInt(mostLikedImageIndex),
                };
            })
        );

        res.status(200).json(formattedData);
    } catch (err) {
        console.error("Error fetching thumbnails:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  
  
  
  
  router.get("/GetThumbnails/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const thumbnails = await Thumbnail.find({ userId })
        .populate("userId", "name profileImage")
        .sort({ createdAt: -1 });
  
      const formattedData = await Promise.all(
        thumbnails.map(async (thumbnail) => {
          const likes = await Like.find({ thumbnailId: thumbnail._id }).select("userId");
  
          return {
            _id: thumbnail._id,
            title: thumbnail.title,
            images: thumbnail.images,
            uploaderName: thumbnail.userId?.name || "Unknown",
            uploaderImage: thumbnail.userId?.profileImage || null,
            uploadDate: thumbnail.createdAt,
            likes: likes.map((like) => like.userId.toString()),
            likeCount: likes.length,
          };
        })
      );
  
      res.status(200).json(formattedData);
    } catch (error) {
      console.error("Error fetching user thumbnails:", error);
      res.status(500).json({ message: "Error fetching thumbnails", error });
    }
  });

  // Update Thumbnail
router.put("/thumbnails/:id", upload.array("thumbnails", 5), async (req, res) => {
  try {
      const { id } = req.params;
      const { title } = req.body;
      const imageUrls = req.files ? req.files.map((file) => file.path) : null;

      // Find and update the thumbnail
      const updatedThumbnail = await Thumbnail.findByIdAndUpdate(
          id,
          {
              ...(title && { title }),
              ...(imageUrls && { images: imageUrls }),
          },
          { new: true } // Return the updated document
      );

      if (!updatedThumbnail) {
          return res.status(404).json({ message: "Thumbnail not found" });
      }

      res.status(200).json({
          message: "Thumbnail updated successfully",
          thumbnail: updatedThumbnail,
      });
  } catch (error) {
      console.error("Error updating thumbnail:", error);
      res.status(500).json({ message: "Error updating thumbnail", error });
  }
});

// Delete Thumbnail
router.delete("/thumbnails/:id", async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the thumbnail
      const deletedThumbnail = await Thumbnail.findByIdAndDelete(id);
      if (!deletedThumbnail) {
          return res.status(404).json({ message: "Thumbnail not found" });
      }

      // Delete associated likes
      await Like.deleteMany({ thumbnailId: id });

      res.status(200).json({
          message: "Thumbnail and associated likes deleted successfully",
          thumbnail: deletedThumbnail,
      });
  } catch (error) {
      console.error("Error deleting thumbnail:", error);
      res.status(500).json({ message: "Error deleting thumbnail", error });
  }
});

  

  module.exports = router;