// src/services/cuentasService.js

import { api } from './api';
import { endpoints } from './endpoints';

export const cuentasService = {
  getCuentas: () => api.get(endpoints.cuentas),

  getCuentas: () => api.get(`${endpoints.cuentas}`),
  // createCuenta: (data) => api.post(endpoints.cuentas, data),
};
