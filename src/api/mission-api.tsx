import * as api from "./api";
import {LawnmowerMissionResponse, MissionItemResponse} from "./models";

// GET /download: download current mission plan
export const getMission = async () => {
    return api.get("/download");
}

// POST /upload: upload mission plan
export const uploadMission = async (
    missions: MissionItemResponse
) => {
    return api.post("/upload", missions);
}

// POST /start: start generic mission sequence
export const startMission = async () => {
    return api.post("/start", {});
}

// POST /start-lawnmower: start lawnmower mission
export const startLawnmowerMission = async () => {
    return api.post("/start_lawnmower", {});
}

export const generateLawnmower = async (
    lawnmowerMission : LawnmowerMissionResponse
) => {
    return api.post("/generate_lawnmower", lawnmowerMission);
}

export const clearMission = async () => {
    return api.remove("/clear_mission");
}
