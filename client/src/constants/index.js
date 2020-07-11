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

const DEVISE_MAPPING = {
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
