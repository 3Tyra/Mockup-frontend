import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here when needed
  },
  // Optional: Add middleware or devTools configuration
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;