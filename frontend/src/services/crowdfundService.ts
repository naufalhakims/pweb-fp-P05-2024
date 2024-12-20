import axios from 'axios';

const BACKEND_URI = "http://localhost:3000";

export const getOpenCrowdfunds = () => {
  const token = localStorage.getItem('token'); 
  return axios.get(`${BACKEND_URI}/admin/`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
};