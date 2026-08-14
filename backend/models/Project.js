const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
      trim: true,
    },
    liveLink: {
      type: String,
      default: '',
      trim: true,
    },
    images: [
      {
        type: String, // Cloudinary image URLs
      },
    ],
    languages: {
      type: Map,
      of: Number,
      default: {}, // Stores raw byte counts from GitHub e.g. { "JavaScript": 45000, "CSS": 12000 }
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);