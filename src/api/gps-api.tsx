import * as api from "./api";

export const getGPS = async () => {
    return api.get("/data");
}