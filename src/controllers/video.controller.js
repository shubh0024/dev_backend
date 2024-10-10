import Video from '../models/video'; // Adjust the path based on your folder structure
import mongoose from 'mongoose';

// Get all videos with pagination
export const getAllVideos = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Get page and limit from query parameters
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }, // Sort by most recent
            populate: { path: 'owner', select: 'username' }, // Populate owner info
        };

        const aggregate = Video.aggregate(); // Create an aggregation query for pagination

        const videos = await Video.aggregatePaginate(aggregate, options);
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get video by ID
export const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id).populate('owner', 'username');

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new video
export const createVideo = async (req, res) => {
    try {
        const { videoFile, thumbnail, title, duration, owner } = req.body;
        const newVideo = new Video({
            videoFile,
            thumbnail,
            title,
            duration,
            owner: mongoose.Types.ObjectId(owner), // Ensure owner is an ObjectId
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update video by ID
export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedVideo = await Video.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(updatedVideo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete video by ID
export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Increment views for a video
export const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;

        const video = await Video.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } }, // Increment views by 1
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Publish/unpublish video by ID
export const togglePublishVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublished } = req.body;

        const video = await Video.findByIdAndUpdate(
            id,
            { isPublished },
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export  {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    incrementViews,
    togglePublishVideo,
}