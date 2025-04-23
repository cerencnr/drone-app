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


    const [missions, setMissions] = useState<{
        acceptance_radius_m: number;
        camera_action: string;
        camera_photo_distance_m: number;
        camera_photo_interval_s: number;
        gimbal_pitch_deg: number;
        gimbal_yaw_deg: number;
        is_fly_through: boolean;
        latitude_deg: number;
        loiter_time_s: number;
        longitude_deg: number;
        relative_altitude_m: number;
        speed_m_s: number;
        vehicle_action: string;
        yaw_deg: number;
    }[] | null>([]);

    useEffect(() => {
        if (response) {
            console.log("API response:", response);

            if (response.mission_items) {
                setMissions(response.mission_items);
            } else {
                console.error("Error: mission_items is undefined");
                setMissions(null);
            }
        }
    }, [response]);

    return {
        data: missions,
        isLoading,
        error,
        mutate
    };
}
