import {useState} from "react";
import {generateLawnmower, getMission, startLawnmowerMission} from "../api/mission-api";
import {LawnmowerMissionResponse} from "../api/models";

export default function useStartLawnmowerMission() {
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const start = async (markers: [number, number][]) => {
        if (!markers || markers.length < 3) {
            console.error("Polygon needs at least 3 points.");
            return { status: 400 };
        }

        setIsStarting(true);
        setError(null);

        const polygon = markers.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));

        const lawnmowerMission: LawnmowerMissionResponse = {
            polygon,
            spacing: 10,
            scouting_altitude: 20,
            execution_altitude: 15,
            speed: 5,
        };

        try {
            await generateLawnmower(lawnmowerMission);

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
