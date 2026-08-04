const Blog = require('../models/Blog');
const { getDb } = require('../config/db');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      return res.status(200).json({ success: true, count: dbInfo.data.blogs.length, data: dbInfo.data.blogs });
    }

    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error('Blogs Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve blogs' });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const blog = dbInfo.data.blogs.find(b => b._id === id);
      if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
      return res.status(200).json({ success: true, data: blog });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Blog Detail Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve blog article' });
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const newBlog = {
        _id: 'm-blog-' + Date.now(),
        ...req.body,
        createdAt: new Date()
      };
      if (typeof newBlog.tags === 'string') {
        newBlog.tags = newBlog.tags.split(',').map(t => t.trim());
      }
      dbInfo.data.blogs.unshift(newBlog);
      return res.status(201).json({ success: true, data: newBlog });
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('Blog Create Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to publish blog article' });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const blogIndex = dbInfo.data.blogs.findIndex(b => b._id === id);
      if (blogIndex === -1) return res.status(404).json({ success: false, message: 'Blog article not found' });

      const updatedBlog = {
        ...dbInfo.data.blogs[blogIndex],
        ...req.body,
        updatedAt: new Date()
      };
      if (typeof updatedBlog.tags === 'string') {
        updatedBlog.tags = updatedBlog.tags.split(',').map(t => t.trim());
      }
      dbInfo.data.blogs[blogIndex] = updatedBlog;
      return res.status(200).json({ success: true, data: updatedBlog });
    }

    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Blog Update Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update blog article' });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const blogIndex = dbInfo.data.blogs.findIndex(b => b._id === id);
      if (blogIndex === -1) return res.status(404).json({ success: false, message: 'Blog article not found' });

      dbInfo.data.blogs.splice(blogIndex, 1);
      return res.status(200).json({ success: true, message: 'Blog article deleted successfully' });
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
    res.status(200).json({ success: true, message: 'Blog article deleted successfully' });
  } catch (error) {
    console.error('Blog Delete Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog article' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
