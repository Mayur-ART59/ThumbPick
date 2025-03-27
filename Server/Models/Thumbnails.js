const mongoose = require('mongoose');

const ThumbnailSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'User',
            default: [],
        }
    },
    { 
        versionKey: false,
        timestamps: true 
    }
);

module.exports = mongoose.model('Thumbnail', ThumbnailSchema);
