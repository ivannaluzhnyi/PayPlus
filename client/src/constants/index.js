/* eslint-disable import/prefer-default-export */
export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  UNICORN: 'UNICORN'
};

export const ROLE = {
  ADMIN: 'ADMIN',
  MERCHANT: 'MERCHANT'
};

export const DEVISE_MAPPING = {
  DOLLAR: 'Dollar américain',
  EURO: 'Euro',
  YEN: 'Yen',
  STERLING: 'Livre Sterling'
};

export const DEVISE = {
  DOLLAR: 'DOLLAR',
  EURO: 'EURO',
  YEN: 'YEN',
  STERLING: 'STERLING'
};

export const MERCHANT_STATUS = {
  CONFIRMED: 'CONFIRMED',
  PENDING: 'PENDING',
  BANNED: 'BANNED',
  DISABLED: 'DISABLED'
};

export const labelColorsUserStatus = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  BANNIE: 'error',
  DISABLED: 'error'
};

export const labelColorsUserRole = {
  ADMIN: 'success',
  MERCHANT: 'secondary'
};

export const labelColorsOperationState = {
  CREATED: 'secondary',
  PROCESSING: 'warning',
  DONE: 'success',
  CANCELED: 'error'
};

export const labelColorsOperationType = {
  CAPTURE: 'success',
  REFUNDED: 'primary'
};

export const labelColorsProductState = {
  Disponible: 'success'
};

export const OPERATIONS_STATE = {
  CREATED: 'CREATED',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
  CANCELED: 'CANCELED'
};

export const OPERATIONS_TYPE = {
  CAPTURE: 'CAPTURE',
  REFUNDED: 'REFUNDED'
};

export const MERCURE_TOPICS = {
  STATS: {
    BY_MERCHANT: '/stats/by-merchant',
    DASHBOARD: '/stats/dashboard',
    DASHBOARD_COUNT_MERCHANT: '/stats/dashboard-count-merchant'
  },
  NOTIFICATIONS: {
    PENDING_MERCHANT: '/notifications/panding-merchant'
  }
};
