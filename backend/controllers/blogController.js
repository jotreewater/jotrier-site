const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');

// Create a new blog post
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, content, images, author, tags } = req.body;

  // Check if required fields are present
  if (!title || !content || !author) {
    res.status(400);
    throw new Error('Title, content, and author are required fields.');
  }

  // Optional: Validate image URLs (if images is not empty)
  if (images && images.length > 0) {
    const invalidImages = images.filter((img) => !isValidUrl(img));
    if (invalidImages.length > 0) {
      res.status(400);
      throw new Error(`Invalid image URLs: ${invalidImages.join(', ')}`);
    }
  }

  // Optional: Validate tags if provided
  if (tags && !Array.isArray(tags)) {
    res.status(400);
    throw new Error('Tags must be an array of strings.');
  }

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

// Helper function to validate URLs
const isValidUrl = (string) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(string);
};

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
