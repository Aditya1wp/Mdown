import axios from 'axios';

// When running on device (Capacitor), localhost might not point to your computer if you test locally.
// However, since we'll build the API to be hosted or we use standard local testing:
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchVideoInfo = async (url) => {
  try {
    const response = await apiClient.post('/info', { url });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message || 'Failed to fetch video information';
  }
};

export const fetchDownloadUrl = async (url, formatId = null) => {
    try {
      const response = await apiClient.post('/download', { url, format_id: formatId });
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || error.message || 'Failed to fetch download URL';
    }
  };
