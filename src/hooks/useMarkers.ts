// hooks/useMarkers.ts
import { useState, useEffect } from "react";
import { MissionResponse } from "../api/models";
import { uploadMission, getMission } from "../api/mission-api";

export default function useMarkers() {
    const [markers, setMarkers] = useState<[number, number][]>([]);

    // Fetch initial mission on mount
    useEffect(() => {
        async function fetchMission() {
            try {
                const data = await getMission();
                if (Array.isArray(data)) {
                    const missionMarkers = data.map((item: MissionResponse) => [item.latitude, item.longitude] as [number, number]);
                    setMarkers(missionMarkers);
                }
            } catch (err) {
                console.error("Failed to fetch mission:", err);
            }
        }
        fetchMission();
    }, []);

    const convertToMissionItems = (coords: [number, number][]): MissionResponse[] => {
        return coords.map(([lat, lng]) => ({
            altitude: 0,
            camera_action: "none",
            gimbal_pitch: 0,
            gimbal_yaw: 0,
            is_fly_through: false,
            latitude: lat,
            loiter_time: 0,
            longitude: lng,
            speed: 0,
            yaw: 0,
        }));
    };

    const syncWithBackend = async (updatedMarkers: [number, number][]) => {
        const missionItems = convertToMissionItems(updatedMarkers);
        try {
            await uploadMission({ mission_items: missionItems });
            console.log("Synced with backend:", missionItems);
        } catch (err) {
            console.error("Failed to sync mission:", err);
        }
    };

    const addMarker = async (position: [number, number]) => {
        const updated = [...markers, position];
        setMarkers(updated);
        await syncWithBackend(updated);
    };

    const deleteMarker = async (index: number) => {
        const updated = markers.filter((_, i) => i !== index);
        setMarkers(updated);
        await syncWithBackend(updated);
    };

    const updateMarker = async (index: number, position: [number, number]) => {
        const updated = markers.map((m, i) => (i === index ? position : m));
        setMarkers(updated);
        await syncWithBackend(updated);
    };

    return {
        markers,
        addMarker,
        deleteMarker,
        updateMarker,
        setMarkers, // optional if needed manually
    };
}
