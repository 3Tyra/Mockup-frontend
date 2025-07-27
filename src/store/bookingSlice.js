import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  scheduledTrips: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking._id !== action.payload);
    },
    setScheduledTrips: (state, action) => {
      state.scheduledTrips = action.payload;
    },
    addScheduledTrip: (state, action) => {
      state.scheduledTrips.push(action.payload);
    },
    removeScheduledTrip: (state, action) => {
      state.scheduledTrips = state.scheduledTrips.filter(trip => trip._id !== action.payload);
    },
  },
});

export const { 
  reset,
  setBookings,
  addBooking,
  removeBooking,
  setScheduledTrips,
  addScheduledTrip,
  removeScheduledTrip,
} = bookingSlice.actions;
export default bookingSlice.reducer;