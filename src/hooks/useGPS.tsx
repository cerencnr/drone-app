import { useState, useEffect } from "react";
import useSWR from "swr";
import { getGPS } from "../api/gps-api";
import type { GPSResponse } from "../api/models";

export default function useGPS(isTracking: boolean) {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR<GPSResponse>("api_gps", async () => await getGPS(), {
        refreshInterval: isTracking ? 250 : 0, // 0.25 seconds
        dedupingInterval: 0,
    });

    const [drone, setDrone] = useState<GPSResponse["drone"] | null>(null);
    const [rover, setRover] = useState<GPSResponse["rover"] | null>(null);

    useEffect(() => {
        if (response) {
            console.log("API gps response:", response);
            setDrone(response.drone ?? null);
            setRover(response.rover ?? null);
        }
    }, [response]);

    return {
        drone,
        rover,
        isLoading,
        error,
        mutate
    };
}
