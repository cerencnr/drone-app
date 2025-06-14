// hooks/useMarkers.ts
import { useState, useEffect } from "react";
import { MissionResponse } from "../api/models";
import { uploadMission } from "../api/mission-api";
import useMission from "./useMission";

export default function useMarkers() {
    const [markers, setMarkers] = useState<[number, number][]>([]);

    // Fetch initial mission using useMission hook
    const { data: missionData } = useMission();

    useEffect(() => {
        if (missionData && Array.isArray(missionData)) {
            console.log("Fetched mission data:", missionData);
            const missionMarkers = missionData.map((item: MissionResponse) => [item.latitude, item.longitude] as [number, number]);
            console.log("missionMarkers", missionMarkers);
            setMarkers(missionMarkers);
        }
    }, [missionData]);

    const convertToMissionItems = (coords: [number, number][]): MissionResponse[] => {
        return coords.map(([lat, lng]) => (
            {
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
            }
        ));
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
        setMarkers,
    };
}
