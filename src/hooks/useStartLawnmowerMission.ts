import {useState} from "react";
import {getMission, startLawnmowerMission} from "../api/mission-api";

export default function useStartLawnmowerMission() {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const start = async () => {
        setIsStarting(true);
        setError(null);

        try {
            const updatedMission = await getMission();
            if (!updatedMission || !updatedMission.waypoints) {
                console.error("Invalid mission data:", updatedMission);
                return { status: 400 };
            }

            const validWaypoints = updatedMission.waypoints.filter(
                (waypoint: { latitude: number | null; longitude: number | null }) =>
                    waypoint.latitude !== null && waypoint.longitude !== null
            );

            if (validWaypoints.length === 0) {
                console.error("No valid waypoints found.");
                return { status: 400 };
            }

            console.log("Valid mission waypoints:", validWaypoints);
            return await startLawnmowerMission();
        } catch (err) {
            console.error("Failed to start lawnmower mission:", err);
            setError(err as Error);
            return { status: 500 };
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
