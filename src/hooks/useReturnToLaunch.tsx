import { useState } from "react";
import useSWR from "swr";
import { getReturnToLaunch } from "../api/return-api";

export default function useReturnToLaunch() {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_return_to_launch", async () => await getReturnToLaunch(), {
            suspense: false,
            revalidateOnMount: false, // Prevent automatic revalidation on mount
            revalidateIfStale: false, // Disable stale revalidation
            revalidateOnFocus: false, // Disable revalidation on window focus
            revalidateOnReconnect: false, // Disable revalidation on reconnect
        }
    );

    const [isTriggering, setIsTriggering] = useState(false);

    const triggerReturnToLaunch = async () => {
        if (isTriggering) {
            console.log("Trigger already in progress, skipping.");
            return null;
        }

        setIsTriggering(true);
        try {
            const response = await getReturnToLaunch();
            console.log("response", response);
            console.log("API response:", response.data);
            return response.data;
        } catch (err) {
            console.error("Error fetching return to launch:", err);
            throw err;
        } finally {
            setIsTriggering(false);
        }
    };

    return {
        isLoading,
        error,
        triggerReturnToLaunch,
    };
}
