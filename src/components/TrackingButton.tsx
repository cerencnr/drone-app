import React from "react";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

interface TrackingButtonProps {
    isTracking: boolean;
    toggleTracking: () => void;
}

const TrackingButton: React.FC<TrackingButtonProps> = ({ isTracking, toggleTracking }) => {
    return (
        <button
            onClick={toggleTracking}
            style={{
                position: "absolute",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "2000",
                height: "2.2rem",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0",
                boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2)",
            }}
        >
            {isTracking ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <StopRoundedIcon />
                    <p style={{ margin: "0", padding: "2px" }}>Halt Session</p>
                </div>
            ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <PlayArrowRoundedIcon />
                    <p style={{ margin: "0", padding: "2px" }}>Start Session</p>
                </div>
            )}
        </button>
    );
};

export default TrackingButton;