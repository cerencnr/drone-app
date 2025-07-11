export type GPSResponse = {
    drone: {
        armed: boolean;
        battery: {
            remainingPercent: number;
            voltage: number;
        }
        flightMode: number;
        heading: number;
        position: {
            abs_alt: number;
            latitude: number;
            longitude: number;
            rel_alt: number;
        }
    }

    rover: {
        armed: boolean;
        battery: {
            remainingPercent: number;
            voltage: number;
        }
        flightMode: number;
        heading: number;
        position: {
            abs_alt: number;
            latitude: number;
            longitude: number;
            rel_alt: number;
        }
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
    polygon:
        {
            latitude: number;
            longitude: number;
        }[],
    spacing: number;
    scouting_altitude: number;
    execution_altitude: number;
    speed: number;
}