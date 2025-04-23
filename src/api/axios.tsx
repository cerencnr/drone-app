import axiosPackage from 'axios';

export const axios = axiosPackage.create({
  baseURL: "http://192.168.1.102:5000/api",
});
