import {useState} from "react";
import {postReturnToLaunch} from "../api/return-api";

export default function useReturnToLaunch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const triggerReturnToLaunch = async () => {
        if (isLoading) {
            console.log("Trigger already in progress, skipping.");
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            return await postReturnToLaunch();
        } catch (err: any) {
            console.error("Error posting return to launch:", err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };


    return {
        isLoading,
        error,
        triggerReturnToLaunch,
    };
}
