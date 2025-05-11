import axiosPackage from 'axios';

export const axios = axiosPackage.create({
  baseURL: "http://localhost:8080/api",
});
