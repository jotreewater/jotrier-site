import axios from 'axios';

const API_URL = '/api/user/';
const LOGIN_URL = `${API_URL}generateJWT/`;
const REGISTER_URL = `${API_URL}createUser/`;

const saveUserToLocalStorage = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

const handleResponse = async (response) => {
  saveUserToLocalStorage(response.data);
  return response.data;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const register = async (userData) => {
  try {
    const response = await axios.post(REGISTER_URL, userData);
    await delay(2000);
    return handleResponse(response);
  } catch (error) {
    console.log();
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    await delay(2000);
    return handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
