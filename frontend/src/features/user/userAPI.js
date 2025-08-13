import axiosInstance from '../../utils/axiosInstance';
import {API_ROOT} from '../../utils/constants';

export const loginAPI = async ({email, password}) => {
  const res = await axiosInstance.post(`${API_ROOT}/v1/user/login`, {email, password});
  console.log(res);
  return res.data;
};

export const logoutAPI = async () => {
  const res = await axiosInstance.delete(`${API_ROOT}/v1/user/logout`);
  return res.data;
};

export const signupAPI = async ({name, email, password}) => {
  const res = await axiosInstance.post(`${API_ROOT}/v1/user/signup`, {name, email, password});
  return res.data;
};
