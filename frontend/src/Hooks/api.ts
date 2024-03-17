// api.js

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Base URL of your Django backend

// Function to upload a PDF file
export const post = async (url:string, data: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/csrf/`, { withCredentials: true });
    const csrfToken = res.headers['x-csrftoken'];

    const response = await axios.post(
      `${BASE_URL}/${url}`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      }
    );

    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const get = async (url:string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`,         {
        withCredentials: true,
        maxRedirects: 5,
        headers: {
          "Content-Type": "application/json",
        },
      });
    return response.data; 
  } catch (error) {
    throw error;
  }
};
