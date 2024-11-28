import axiosPackage from 'axios';

export const axios = axiosPackage.create({
  baseURL: "http://192.168.233.106:5000/api",
  timeout: 2000,
});
