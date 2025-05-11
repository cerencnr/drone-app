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
    altitude: number,
    camera_action: string,
    gimbal_pitch: number,
    gimbal_yaw: number,
    is_fly_through: boolean,
    latitude: number,
    loiter_time: number,
    longitude: number,
    speed: number,
    yaw: number
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