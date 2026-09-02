import api from './api';

export const officerApi = {
  getDashboard: async () => {
    const response = await api.get('/officer/dashboard');
    return response.data;
  },
  getProcurements: async () => {
    const response = await api.get('/officer/procurements');
    return response.data;
  },
  submitWeighment: async (procurementId, data) => {
    const response = await api.post(`/officer/procurements/${procurementId}/quality`, data);
    return response.data;
  }
};
