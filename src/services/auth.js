import { post, put } from '@/api';

export const loginService = async (credentials) => {
  const response  = await post('/auth/sign_in', credentials);
  return response.data;
};

export const registerService = async (credentials) => {
  const response  = await post('/auth', credentials);
  return response.data;
};

export const loginWithProvider = async (credentials) => {
  const response = await post('/social_auth/callback', credentials);
  return response.data; 
};

export const forgotPasswordService = async (credentials) => {
  const response = await post('/auth/password', credentials);
  return response.data;
};

export const resetPasswordService = async (credentials) => {
  const response = await put('/auth/password', credentials);
  return response.data;
};
