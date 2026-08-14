const express = require('express');
const router = express.Router();
const {
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const upload = require('../middleware/uploadMiddleware');

// Direct Project CRUD routes (No authentication required)
// Multer handles up to 5 screenshot uploads per project
router.post('/projects', upload.array('images', 5), createProject);
router.put('/projects/:id', upload.array('images', 5), updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;