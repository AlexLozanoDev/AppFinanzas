// src/services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://sunlit-mix-416216.uc.r.appspot.com/api';

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (method, endpoint, data = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeader()),
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }

  return response.json();
};

export const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  patch: (endpoint, data) => request('PATCH', endpoint, data),
  delete: (endpoint) => request('DELETE', endpoint),
};
