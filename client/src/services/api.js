import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('agrocure_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getFarmerDashboard = async () => {
  try {
    const res = await API.get('/farmer/dashboard');
    return res.data;
  } catch (err) {
    return null;
  }
};

export const registerCropAndBookSlot = async (payload) => {
  const res = await API.post('/farmer/register-crop', payload);
  return res.data;
};

export const getCentres = async (search = '') => {
  const res = await API.get(`/centres${search ? `?search=${search}` : ''}`);
  return res.data;
};

export const getOfficerDashboard = async () => {
  const res = await API.get('/officer/dashboard');
  return res.data;
};

export const verifyToken = async (tokenNumber) => {
  const res = await API.get(`/officer/token/${tokenNumber}`);
  return res.data;
};

export const submitWeighment = async (payload) => {
  const res = await API.post('/officer/weighment', payload);
  return res.data;
};

export const getAdminDashboard = async () => {
  const res = await API.get('/admin/dashboard');
  return res.data;
};

export const createGrievance = async (payload) => {
  const res = await API.post('/grievances', payload);
  return res.data;
};

export const getGrievances = async () => {
  const res = await API.get('/grievances');
  return res.data;
};

export const getDocuments = async () => {
  const res = await API.get('/farmer/documents');
  return res.data;
};

export default API;
