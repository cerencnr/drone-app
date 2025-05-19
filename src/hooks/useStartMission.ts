import { useState } from "react";
import { startMission } from "../api/mission-api";

export default function useStartMission() {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const start = async () => {
        setIsStarting(true);
        setError(null);
        try {
            await startMission();
        } catch (err) {
            console.error("Failed to start mission:", err);
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