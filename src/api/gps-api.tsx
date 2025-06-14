import * as api from "./api";

// GET /data: get telemetry data
export const getGPS = async () => {
    return api.get("/data");
}

export const getMockGPS = async () => {
    return {
        "armed": true,
        "battery": {
            "remainingPercent": 100,
            "voltage": 12.5
        },
        "flightMode": 1,
        "position": {
            "absoluteAltitude": 100,
            "latitude": 37.7749,
            "longitude": -122.4194,
            "relativeAltitude": 50
        }
    }
}