import api from './api';

const bookSeat = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

const getUserBookings = async (userId) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

const getAllBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

const scheduleTrip = async (tripData) => {
  const response = await api.post('/bookings/schedule', tripData);
  return response.data;
};

const getDriverScheduledTrips = async (driverId) => {
  const response = await api.get(`/bookings/driver/${driverId}`);
  return response.data;
};

const cancelScheduledTrip = async (tripId) => {
  const response = await api.delete(`/bookings/schedule/${tripId}`);
  return response.data;
};

const bookingService = {
  bookSeat,
  getUserBookings,
  getAllBookings,
  scheduleTrip,
  getDriverScheduledTrips,
  cancelScheduledTrip,
};

export default bookingService;