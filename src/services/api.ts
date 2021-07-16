import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PROD_PAYMENT_API,
});

export default api;
