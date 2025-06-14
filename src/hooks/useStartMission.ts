import {useState} from "react";
import {startMission} from "../api/mission-api";


//TODO: add timeout
export default function useStartMission() {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const start = async () => {
        setIsStarting(true);
        setError(null);
        try {
            return await startMission();
        } catch (err) {
            console.error("Failed to start mission:", err);
            setError(err as Error);
            throw err;
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
