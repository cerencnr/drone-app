export type GPSResponse = {
    armed: boolean;
    battery: {
        remaining_percent: number;
        voltage: number;
    }
    flight_mode: number;
    position: {
        absolute_altitude: number;
        latitude: number;
        longitude: number;
        relative_altitude: number;
    }
}

export type MissionResponse = {
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
}

export type MissionItemResponse = {
    mission_items: MissionResponse[];
}

export type LawnmowerMissionResponse = {
    polygon: [
        {
            latitude: number;
            longitude: number;
        }
    ],
    spacing: number;
    scouting_altitude: number;
    execution_altitude: number;
    speed: number;
}