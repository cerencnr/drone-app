export type GPSResponse = {
    battery: number;
    global_position: {
        alt: number;
        eph: number;
        epv: number;
        lat: number;
        lon: number;
    }
    timestamp: string;
    vehicle_odometry: {
        position: {
            x: number;
            y: number;
            z: number;
        }
        speed: number;
        velocity: {
            x: number;
            y: number;
            z: number;
        }
    }
    vehicle_status: {
        arming_state: number;
        nav_state: number;
    }
}