import axiosPackage from 'axios';

export const axios = axiosPackage.create({
    baseURL: "http://192.168.1.190:8080",
    //baseURL: "http://localhost:8080/api",
});
