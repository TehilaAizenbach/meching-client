import axios from 'axios'

// const BASE_URL='http://localhost:3001/'
const BASE_URL='https://mechingkiryatata.onrender.com'
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed
    },
  });

  export const fetchData = async (endpoint, method = 'get', data = null, headers = {}) => {
    try {
      const response = await api({
        url: endpoint,
        method,
        data,
        headers,
      });
      // Handle the response data as needed
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('API Error:', error);
      throw error;
    }
  };
  
  export default api;