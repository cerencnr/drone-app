import { useState, useEffect } from "react";
import useSWR from "swr";
import {getGPS, getMockGPS} from "../api/gps-api";

export default function useGPS(isTracking: boolean) {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_gps", async () => await getMockGPS(), {
        refreshInterval: isTracking ? 250 : 0, //0.25 seconds
        dedupingInterval: 0,
    });

    const [armed, setArmed] = useState<boolean | null>(null);

    const [battery, setBattery] = useState<{
        remaining_percent: number;
        voltage: number;
    } | null>(null);

    const [flightMode, setFlightMode] = useState<number | null>(null);

    const [position, setPosition] = useState<{
        absolute_altitude: number;
        latitude: number;
        longitude: number;
        relative_altitude: number;
    } | null>(null);

    useEffect(() => {
        if (response) {
            console.log("API gps response:", response);
            setArmed(response.armed ?? null);
            setBattery(response.battery ? {
                remaining_percent: response.battery.remaining_percent,
                voltage: response.battery.voltage,
            } : null);
            setFlightMode(response.flightMode ?? null);

            setPosition(response.position ? {
                absolute_altitude: response.position.absolute_altitude,
                latitude: response.position.latitude,
                longitude: response.position.longitude,
                relative_altitude: response.position.relative_altitude,
            } : null);
        }
    }, [response]);

    return {
        armed,
        battery,
        flightMode,
        position,
        isLoading,
        error,
        mutate
    };
}