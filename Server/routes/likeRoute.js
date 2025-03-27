const express = require("express");
const router = express.Router();
const Like = require("../Models/Likes");

router.post("/like", async (req, res) => {
    try {
        const { thumbnailId, userId, imageIndex } = req.body;

        if (!thumbnailId || userId === undefined || imageIndex === undefined) {
            return res.status(400).json({ error: "Thumbnail ID, User ID, and Image Index are required." });
        }

        // Check if the user has already liked any image in this thumbnail
        const existingLike = await Like.findOne({ thumbnailId, userId });

        if (existingLike) {
            if (existingLike.imageIndex !== imageIndex) {
                // User tried to like another image without unliking the first one
                return res.status(200).json({ 
                    warning: "Please unlike the other image first before liking a new one.", 
                    liked: false 
                });
            }

            // Unlike (remove the like entry)
            await Like.deleteOne({ _id: existingLike._id });
            return res.json({ message: "Unliked successfully", liked: false });
        } 

        // Like (create a new like entry)
        await new Like({ thumbnailId, userId, imageIndex }).save();
        return res.json({ message: "Liked successfully", liked: true });

    } catch (error) {
        console.error("Error in liking/unliking:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/likes/totalPerThumbnail", async (req, res) => {
    try {
      const results = await Like.aggregate([
        {
          $group: {
            _id: "$thumbnailId",
            totalLikes: { $sum: 1 }
          }
        }
      ]);
      res.json(results);
    } catch (err) {
      console.error("Error in /likes/totalPerThumbnail:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/likes/:thumbnailId", async (req, res) => {
    try {
        const { thumbnailId } = req.params;
        const userId = req.query.userId;

        if (!thumbnailId) {
            return res.status(400).json({ error: "Thumbnail ID is required." });
        }

        const likes = await Like.find({ thumbnailId });

        const likeCounts = {};
        const userLikes = {};

        likes.forEach(like => {
            const key = `${like.thumbnailId}-${like.imageIndex}`;
            likeCounts[key] = (likeCounts[key] || 0) + 1;

            if (like.userId.toString() === userId) {
                userLikes[key] = true;
            }
        });

        res.json({ likeCounts, userLikes });
    } catch (error) {
        console.error("Error fetching like count:", error);
        res.status(500).json({ error: "Server error" });
    }
});



  





module.exports = router;



