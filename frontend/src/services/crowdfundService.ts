import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export const getOpenCrowdfunds = () => {
  return axios.get(`${BACKEND_URI}/admin/`);
};