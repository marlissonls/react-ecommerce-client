
import axios from 'axios';

const API_URL = import.meta.env.VITE_API;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');

  if (auth) {
    const session = JSON.parse(auth);

    if (session.AccessToken) {
      config.headers.Authorization = `Bearer ${session.AccessToken}`;
    }

    if (session._id) {
      config.headers.user = session._id;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const auth = localStorage.getItem('auth');

    if (!auth) {
      return Promise.reject(error);
    }

    try {
      const session = JSON.parse(auth);

      if (!session.RefreshToken) {
        return Promise.reject(error);
      }

      const response = await refreshApi.get('/users/auth', {
        headers: {
          RefreshToken: session.RefreshToken,
        },
      });

      const newSession = {
        ...session,
        AccessToken: response.data.AccessToken,
      };

      localStorage.setItem('auth', JSON.stringify(newSession));

      originalRequest.headers.Authorization =
        `Bearer ${response.data.AccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default api;
