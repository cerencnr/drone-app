import { useState } from "react";
import { startLawnmowerMission } from "../api/mission-api";

export default function useStartLawnmowerMission() {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const start = async () => {
        setIsStarting(true);
        setError(null);
        try {
            await startLawnmowerMission();
        } catch (err) {
            console.error("Failed to start lawnmower mission:", err);
            setError(err as Error);
        } finally {
            setIsStarting(false);
        }
    };

    return {
        isStarting,
        error,
        start,
    };
}