import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buses: [],
  routes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
    addBus: (state, action) => {
      state.buses.push(action.payload);
    },
    removeBus: (state, action) => {
      state.buses = state.buses.filter(bus => bus._id !== action.payload);
    },
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    addRoute: (state, action) => {
      state.routes.push(action.payload);
    },
    removeRoute: (state, action) => {
      state.routes = state.routes.filter(route => route._id !== action.payload);
    },
  },
});

export const { 
  reset, 
  setBuses, 
  addBus, 
  removeBus,
  setRoutes,
  addRoute,
  removeRoute,
} = busSlice.actions;
export default busSlice.reducer;