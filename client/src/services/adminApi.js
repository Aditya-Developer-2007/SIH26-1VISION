import api from './api';

export const adminApi = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  getProcurements: async () => {
    const response = await api.get('/admin/procurements');
    return response.data;
  },
  getFarmers: async () => {
    const response = await api.get('/admin/farmers');
    return response.data;
  },
  getOfficers: async () => {
    const response = await api.get('/admin/officers');
    return response.data;
  },
  updateOfficerAssignment: async (officerId, assignedCentreIds) => {
    const response = await api.put(`/admin/officers/${officerId}/assignments`, { assignedCentreIds });
    return response.data;
  },
  getPayments: async () => {
    const response = await api.get('/admin/payments');
    return response.data;
  },
  initiatePayment: async (paymentId) => {
    const response = await api.post(`/admin/payments/${paymentId}/initiate`);
    return response.data;
  }
};
