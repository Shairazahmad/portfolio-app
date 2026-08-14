const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');

// Public read access for the main portfolio view
router.get('/', getProjects);

// Direct management endpoints for the Admin Panel (no auth middleware required)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;