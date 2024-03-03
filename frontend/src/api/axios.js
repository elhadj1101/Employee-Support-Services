import axios from 'axios';

const axios = axios.create({
  baseURL: ' http://localhost:3000',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your-token-here'
  }
});

export default instance;
