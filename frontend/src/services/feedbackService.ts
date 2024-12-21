import axios from 'axios';

const BASE_URL = 'http://localhost:3000/feedback'; // Ganti dengan URL backend Anda

export const sendFeedback = async (feedback: {
  name: string;
  is_anonymous: boolean;
  email: string;
  message: string;
}) => {
  return axios.post(`${BASE_URL}`, feedback);
};

export const getFeedbacks = async () => {
  return axios.get(`${BASE_URL}`);
};