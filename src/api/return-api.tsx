import * as api from "./api";

export const getReturnToLaunch = async () => {
    return api.get("/return_to_launch");
}