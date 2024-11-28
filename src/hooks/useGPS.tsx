import { useState, useEffect } from "react";
import useSWR from "swr";
import { getGPS } from "../api/gps-api";

export default function useGPS(isTracking: boolean) {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_gps", async () => await getGPS(), {
        refreshInterval: isTracking ? 250 : 0, //0.25 seconds
        dedupingInterval: 0,
    });

    const [battery, setBattery] = useState<number | null>(null);

    const [globalPosition, setGlobalPosition] = useState<{
        alt: number;
        eph: number;
        epv: number;
        lat: number;
        lon: number;
    } | null>(null);

    const [timestamp, setTimeStamp] = useState<string | null>(null);

    const [vehicleOdometry, setVehicleOdometry] = useState<{
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
    } | null>(null);

    const [vehicleStatus, setVehicleStatus] = useState<{
        arming_state: number;
        nav_state: number;
    } | null>(null);


    useEffect(() => {
        console.log("response: ", response);
        if (response) {
            setBattery(response.battery);
            setGlobalPosition({
                alt: response.global_position.alt,
                eph: response.global_position.eph,
                epv: response.global_position.epv,
                lat: response.global_position.lat,
                lon: response.global_position.lon,
            });
            setTimeStamp(response.timestamp);

            setVehicleOdometry({
                position: {
                    x: response.vehicle_odometry.position.x,
                    y: response.vehicle_odometry.position.y,
                    z: response.vehicle_odometry.position.z,
                },
                speed: response.vehicle_odometry.speed,
                velocity: {
                    x: response.vehicle_odometry.velocity.x,
                    y: response.vehicle_odometry.velocity.y,
                    z: response.vehicle_odometry.velocity.z,
                }
            });
            setVehicleStatus({
                arming_state: response.vehicle_status.arming_state,
                nav_state: response.vehicle_status.nav_state
            })
        }
    }, [response]);

    return {
        battery,
        globalPosition,
        timestamp,
        vehicleOdometry,
        vehicleStatus,
        isLoading,
        error,
        mutate
    };
}