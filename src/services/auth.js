import { post } from '@/api';

export const loginService = async (credentials) => {
  const response  = await post('/auth/sign_in', credentials);
  return response.data;
};
