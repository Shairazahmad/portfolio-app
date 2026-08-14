import axios from 'axios';

// Base URL points to your Express backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach JWT token to requests if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API Calls
export const fetchProjects = () => API.get('/projects');
export const fetchProjectById = (id) => API.get(`/projects/${id}`);
export const fetchLanguageSummary = () => API.get('/languages/summary');

// Admin Auth Calls
export const loginAdmin = (credentials) => API.post('/admin/login', credentials);

// Admin Protected Project Operations
export const createProject = (formData) =>
  API.post('/admin/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProject = (id, formData) =>
  API.put(`/admin/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProject = (id) => API.delete(`/admin/projects/${id}`);

export default API;