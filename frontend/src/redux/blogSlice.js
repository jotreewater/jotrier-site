import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService';

// Create asynchronous thunk actions
export const getAllBlogPosts = createAsyncThunk('blog/fetchAll', async () => {
  const response = await blogService.getAllBlogPosts();
  return response;
});

export const getBlogPostById = createAsyncThunk(
  'blog/fetchById',
  async (id) => {
    const response = await blogService.getBlogPostById(id);
    return response;
  }
);

export const createBlogPost = createAsyncThunk(
  'blog/create',
  async (postData) => {
    const response = await blogService.createBlogPost(postData);
    return response;
  }
);

export const updateBlogPost = createAsyncThunk(
  'blog/update',
  async ({ id, postData }) => {
    const response = await blogService.updateBlogPost(id, postData);
    return response;
  }
);

export const deleteBlogPost = createAsyncThunk('blog/delete', async (id) => {
  await blogService.deleteBlogPost(id);
  return id; // Return the ID of the deleted post for state update
});

// Create the blog slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blog posts
      .addCase(getAllBlogPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch a single blog post by ID
      .addCase(getBlogPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(getBlogPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create a blog post
      .addCase(createBlogPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update a blog post
      .addCase(updateBlogPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete a blog post
      .addCase(deleteBlogPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { clearError } = blogSlice.actions;
export default blogSlice.reducer;
