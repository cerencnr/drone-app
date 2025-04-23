import * as api from "./api";

// GET /data: get telemetry data
export const getGPS = async () => {
    return api.get("/data");
}

export const getMockGPS = async () => {
    return {
        "armed": true,
        "battery": {
            "remaining_percent": 100,
            "voltage": 12.5
        },
        "flightMode": 1,
        "position": {
            "absolute_altitude": 100,
            "latitude": 37.7749,
            "longitude": -122.4194,
            "relative_altitude": 50
        }
    }
}