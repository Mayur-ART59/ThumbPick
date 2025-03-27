const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        thumbnailId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thumbnail',
            required: true,
        },
        imageIndex: { type: Number, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
    },
    { timestamps: true,versionKey:false }
);

LikeSchema.index({ thumbnailId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Like', LikeSchema);
