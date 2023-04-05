import axios from 'axios';

export const clientBackend = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});