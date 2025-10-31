import axios, { AxiosError } from 'axios';

export type ApiError = Error & {
  status?: number;
  documentationUrl?: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_GH_TOKEN}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      let errorMessage =
        'Network error. Please check your internet connection.';
      if (error.code === 'ECONNABORTED') {
        errorMessage =
          'The request timed out. Please check your internet connection and try again.';
      }
      const apiError: ApiError = new Error(errorMessage);
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

export default api;
