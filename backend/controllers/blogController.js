const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');

// Create a new blog post
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, content, images, author, tags } = req.body;

  const newBlogPost = new Blog({
    title,
    content,
    images,
    author,
    tags,
  });

  const savedPost = await newBlogPost.save();
  res.status(201).json(savedPost);
});

// Get a single blog post by ID
const getBlogPostById = asyncHandler(async (req, res) => {
  const blogPost = await Blog.findById(req.params.id).populate(
    'author',
    'username'
  );
  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json(blogPost);
});

// Get all blog posts
const getAllBlogPosts = asyncHandler(async (req, res) => {
  const blogPosts = await Blog.find().sort({ createdAt: -1 });
  res.json(blogPosts);
});

// Update a blog post by ID
const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, content, images, tags } = req.body;

  const updatedBlogPost = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      images,
      tags,
      updatedAt: Date.now(),
    },
    { new: true }
  );

  if (!updatedBlogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  res.json(updatedBlogPost);
});

// Delete a blog post by ID
const deleteBlogPost = asyncHandler(async (req, res) => {
  const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
  if (!deletedBlogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json({ message: 'Blog post deleted successfully' });
});

module.exports = {
  createBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
};
