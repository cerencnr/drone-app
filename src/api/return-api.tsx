import * as api from "./api";

export const postReturnToLaunch = async () => {
    return api.post("/rtl", {});
}