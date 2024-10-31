import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  clearError,
} from '../../redux/blogSlice';

export default function CreateBlog() {
  const dispatch = useDispatch();
  const { posts, currentPost, loading, error } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [postId, setPostId] = useState(null);
  return <div>CreateBlog</div>;
}
