import { axios } from "./axios";

export const get = async (location: string, params = {}) => {
    return axios
        .get(location, { params })
        .then((response) => response.data)
        .catch((error) => {
            console.log("api error: ", error);
            throw error;
        });
};

export const put = async (location: string, body: any, params = {}) => {
    return axios
        .put(location, body, { params })
        .then((response) => response)
        .catch((error) => {
            console.log("api error: ", error);
        });
};
