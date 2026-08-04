const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  readingTime: {
    type: String,
    default: '3 min'
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  author: {
    type: String,
    default: 'Deepankar Dayal'
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
