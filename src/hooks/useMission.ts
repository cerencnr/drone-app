import useSWR from "swr";
import {getMission} from "../api/mission-api";
import { useEffect, useState } from "react";

export default function useMission() {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_mission", () => getMission(), {});


    const [waypoint, setWaypoint] = useState<{
        "waypoints": {
                "altitude": number,
                "camera_action": string,
                "gimbal_pitch": number,
                "gimbal_yaw": number,
                "is_fly_through": boolean,
                "latitude": number,
                "loiter_time": number,
                "longitude": number,
                "speed": number,
                "yaw": number
            }[]
        } | null>();

    useEffect(() => {
        if (response) {
            console.log("API mission response:", response);

            if (response?.waypoints && response?.waypoints[0]?.altitude !== null) {
                setWaypoint(response?.waypoints);
            } else {
                console.error("Error: waypoints is undefined");
                setWaypoint(null);
            }
        }
    }, [response]);

    return {
        data: waypoint,
        isLoading,
        error,
        mutate
    };
}
