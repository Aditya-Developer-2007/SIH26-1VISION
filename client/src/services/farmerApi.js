import api from './api';

export const farmerApi = {
  getDashboard: async () => {
    const response = await api.get('/farmer/dashboard');
    return response.data;
  },
  getProcurements: async () => {
    const response = await api.get('/farmer/procurements');
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/farmer/profile');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put('/farmer/profile', data);
    return response.data;
  },
  getCrops: async () => {
    const response = await api.get('/farmer/crops');
    return response.data;
  },
  getCentres: async () => {
    const response = await api.get('/farmer/centres');
    return response.data;
  },
  registerCropAndBookSlot: async (data) => {
    const response = await api.post('/farmer/procurements', data);
    return response.data;
  },
  getGrievances: async () => {
    const response = await api.get('/farmer/grievances');
    return response.data;
  },
  createGrievance: async (data) => {
    const response = await api.post('/farmer/grievances', data);
    return response.data;
  },
  getDocuments: async () => {
    const response = await api.get('/farmer/documents');
    return response.data;
  }
};
