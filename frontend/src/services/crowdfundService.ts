import axios from 'axios';

const BACKEND_URI = "http://localhost:3000";

export const getAdminCrowdfunds = () => {
  const token = localStorage.getItem('token'); 
  return axios.get(`${BACKEND_URI}/admin/`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
};

export const getAdminCrowdfundDetail = (crowdfundId: string) => {
  const token = localStorage.getItem('token'); 
  return axios.get(`${BACKEND_URI}/admin/${crowdfundId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const createCrowdfund = (payload: { name: string; target: number }) => {
  const token = localStorage.getItem('token'); 
  return axios.post(`${BACKEND_URI}/admin/create`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const editCrowdfund = (id: string, payload: { name: string; target: string; status: 'open' | 'close' }) => {
  const token = localStorage.getItem('token'); 
  return axios.put(`${BACKEND_URI}/admin/edit/${id}`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const deleteCrowdfund = (id: string) => {
  const token = localStorage.getItem('token'); 
  return axios.delete(`${BACKEND_URI}/admin/crowdfunds/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getCommentsOnCrowdfund = (crowdfundId: string) => {
  const token = localStorage.getItem('token'); 
  return axios.get(`${BACKEND_URI}/admin/${crowdfundId}/comment`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const deleteComment = (crowdfundId: string, commentId: string) => {
  const token = localStorage.getItem('token'); 
  return axios.delete(`${BACKEND_URI}/admin/delete/${crowdfundId}/comment/${commentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};