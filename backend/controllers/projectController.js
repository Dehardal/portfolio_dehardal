const Project = require('../models/Project');
const { getDb } = require('../config/db');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      return res.status(200).json({ success: true, count: dbInfo.data.projects.length, data: dbInfo.data.projects });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Projects Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve projects' });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const project = dbInfo.data.projects.find(p => p._id === id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Project Detail Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch project details' });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const newProject = {
        _id: 'm-proj-' + Date.now(),
        ...req.body,
        createdAt: new Date()
      };
      if (typeof newProject.techStack === 'string') {
        newProject.techStack = newProject.techStack.split(',').map(s => s.trim());
      }
      dbInfo.data.projects.unshift(newProject);
      return res.status(201).json({ success: true, data: newProject });
    }

    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Project Create Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create project' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const projectIndex = dbInfo.data.projects.findIndex(p => p._id === id);
      if (projectIndex === -1) return res.status(404).json({ success: false, message: 'Project not found' });

      const updatedProject = {
        ...dbInfo.data.projects[projectIndex],
        ...req.body,
        updatedAt: new Date()
      };
      if (typeof updatedProject.techStack === 'string') {
        updatedProject.techStack = updatedProject.techStack.split(',').map(s => s.trim());
      }
      dbInfo.data.projects[projectIndex] = updatedProject;
      return res.status(200).json({ success: true, data: updatedProject });
    }

    const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Project Update Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update project' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const projectIndex = dbInfo.data.projects.findIndex(p => p._id === id);
      if (projectIndex === -1) return res.status(404).json({ success: false, message: 'Project not found' });

      dbInfo.data.projects.splice(projectIndex, 1);
      return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }

    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Project Delete Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
