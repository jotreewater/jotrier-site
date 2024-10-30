import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import blogReducer from './blogSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    blog: blogReducer,
  },
});

export default store;
