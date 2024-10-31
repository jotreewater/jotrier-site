import axios from 'axios';

const API_URL = '/api/blog/';

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    throw new Error(
      error.response.data.message || 'An error occurred with the server request'
    );
  } else if (error.request) {
    // Request was made but no response received
    throw new Error(
      'No response received from the server. Please check your connection.'
    );
  } else {
    // Something went wrong in setting up the request
    throw new Error(error.message);
  }
};

// Create a new blog post
export const createBlogPost = async (postData) => {
  try {
    console.log(postData);
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get all blog posts
export const getAllBlogPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a blog post by ID
export const updateBlogPost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, postData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a blog post by ID
export const deleteBlogPost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
