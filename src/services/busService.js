import api from './api';

const registerBus = async (busData) => {
  const response = await api.post('/buses', busData);
  return response.data;
};

const getDriverBuses = async (driverId) => {
  const response = await api.get(`/buses/driver/${driverId}`);
  return response.data;
};

const getAllBuses = async () => {
  const response = await api.get('/buses');
  return response.data;
};

const deleteBus = async (busId) => {
  const response = await api.delete(`/buses/${busId}`);
  return response.data;
};

const getAllRoutes = async () => {
  const response = await api.get('/buses/routes');
  return response.data;
};

const addRoute = async (routeData) => {
  const response = await api.post('/buses/routes', routeData);
  return response.data;
};

const deleteRoute = async (routeId) => {
  const response = await api.delete(`/buses/routes/${routeId}`);
  return response.data;
};

const busService = {
  registerBus,
  getDriverBuses,
  getAllBuses,
  deleteBus,
  getAllRoutes,
  addRoute,
  deleteRoute,
};

export default busService;