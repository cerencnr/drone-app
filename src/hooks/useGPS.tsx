import { useState, useEffect } from "react";
import useSWR from "swr";
import {getGPS} from "../api/gps-api";

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

    const [armed, setArmed] = useState<boolean | null>(null);

    const [battery, setBattery] = useState<{
        remainingPercent: number;
        voltage: number;
    } | null>(null);

    const [flightMode, setFlightMode] = useState<number | null>(null);

    const [position, setPosition] = useState<{
        absoluteAltitude: number;
        latitude: number;
        longitude: number;
        relativeAltitude: number;
    } | null>(null);

    useEffect(() => {
        if (response) {
            console.log("API gps response:", response);
            setArmed(response.armed ?? null);
            setBattery(response.battery ? {
                remainingPercent: response.battery.remainingPercent,
                voltage: response.battery.voltage,
            } : null);
            setFlightMode(response.flightMode ?? null);

            setPosition(response.position ? {
                absoluteAltitude: response.position.absoluteAltitude,
                latitude: response.position.latitude,
                longitude: response.position.longitude,
                relativeAltitude: response.position.relativeAltitude,
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