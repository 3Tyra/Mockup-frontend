import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Get user from localStorage if available
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
    },
    logout: (state) => {
      state.user = null;
      authService.logout();
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
    }
  },
  extraReducers: (builder) => {
    // You can add async thunks here if needed
  },
});

export const { reset, login, logout, register } = authSlice.actions;
export default authSlice.reducer;