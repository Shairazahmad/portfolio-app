const Project = require('../models/Project');
const { fetchRepoLanguages } = require('../utils/githubService');

// @desc    Get all public projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new project (Admin)
// @route   POST /api/admin/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveLink, featured, platform } = req.body;

    // Process Cloudinary image URLs if files uploaded
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    // Fetch language byte data from GitHub API automatically
    const languages = await fetchRepoLanguages(githubLink);

    const project = new Project({
      title,
      description,
      githubLink,
      liveLink: liveLink || '',
      featured: featured === 'true' || featured === true,
      platform: platform === 'app' ? 'app' : 'web',
      images,
      languages,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update existing project (Admin)
// @route   PUT /api/admin/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, githubLink, liveLink, featured, platform } = req.body;

    // Check if GitHub Link changed — if so, re-fetch language bytes
    if (githubLink && githubLink !== project.githubLink) {
      project.githubLink = githubLink;
      project.languages = await fetchRepoLanguages(githubLink);
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (platform === 'web' || platform === 'app') project.platform = platform;

    // Append new uploaded images if provided
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      project.images = [...project.images, ...newImages];
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete project (Admin)
// @route   DELETE /api/admin/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};