// src/services/adminService.js
import api from './api';

const adminService = {
  getAllUsers: async () => {
    return await api.get('/admin/users');
  },
  getDashboardStats: async () => {
    return await api.get('/admin/stats');
  },
  createRoute: async (routeData) => {
    return await api.post('/admin/routes', routeData);
  },
  updateUserStatus: async (userId, status) => {
    return await api.patch(`/admin/users/${userId}`, { status });
  },
  deleteRoute: async (routeId) => {
    return await api.delete(`/admin/routes/${routeId}`);
  }
};

export default adminService;