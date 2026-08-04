const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  features: {
    type: String,
    required: true
  },
  architecture: {
    type: String,
    required: true
  },
  techStack: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Working', 'In Progress', 'Research', 'Concept'],
    default: 'In Progress'
  },
  domain: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  futureScope: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
