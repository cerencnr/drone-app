import { useState } from "react";
import useSWR from "swr";
import { getMission, uploadMission } from "../api/mission-api";
import {MissionItemResponse, MissionResponse} from "../api/models";

export default function useUploadMission(
    waypointList: MissionResponse[],
) {
    const { data, isLoading, error, mutate } = useSWR("api_upload_mission", getMission);
    const [isUploading, setIsUploading] = useState(false);

    const upload = async (mission: MissionItemResponse) => {
        setIsUploading(true);
        try {
            await uploadMission(mission);
            await mutate(); // Refresh mission data after upload
        } catch (err) {
            console.error("Failed to upload mission:", err);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        isUploading,
        upload,
    };
}