const express = require('express');
const {
  createBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');

const router = express.Router();

// Route to create a new blog post
router.post('/', createBlogPost);

// Route to get all blog posts
router.get('/', getAllBlogPosts);

// Route to get a single blog post by ID
router.get('/:id', getBlogPostById);

// Route to update a blog post by ID
router.put('/:id', updateBlogPost);

// Route to delete a blog post by ID
router.delete('/:id', deleteBlogPost);

module.exports = router;
