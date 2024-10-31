import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  clearError,
} from '../../redux/blogSlice';

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, currentPost, loading, error } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth); // Get the author information from auth state

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [postId, setPostId] = useState(null);

  // Fetch all blog posts on component mount
  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  // Handle submission for creating or updating a blog post
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      images,
      tags,
      author: user._id, // Include the author's ID
    };

    if (editMode) {
      dispatch(
        updateBlogPost({
          id: postId,
          postData,
        })
      );
    } else {
      dispatch(createBlogPost(postData)); // Pass postData with author included
    }
    clearForm();
  };

  // Clear form fields
  const clearForm = () => {
    setTitle('');
    setContent('');
    setImages([]);
    setTags([]);
    setEditMode(false);
    setPostId(null);
  };

  // Handle editing a blog post
  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setImages(post.images);
    setTags(post.tags);
    setEditMode(true);
    setPostId(post._id);
  };

  // Handle deleting a blog post
  const handleDelete = (id) => {
    dispatch(deleteBlogPost(id));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={() => dispatch(clearError())}>Clear Error</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>{editMode ? 'Edit' : 'Create'} Blog Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URLs (comma separated)"
          value={images.join(', ')}
          onChange={(e) =>
            setImages(e.target.value.split(',').map((img) => img.trim()))
          }
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags.join(', ')}
          onChange={(e) =>
            setTags(e.target.value.split(',').map((tag) => tag.trim()))
          }
        />
        <button type="submit">{editMode ? 'Update' : 'Create'} Post</button>
        <button type="button" onClick={clearForm}>
          Cancel
        </button>
      </form>

      <h2>All Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
