import React, { useState } from "react";
import CurrentStatus from "./CurrentStatus";
import MissionStatus from "./MissionStatus";
import './Sidebar.css';

interface SidebarProps {
    globalPosition: {
        alt: number;
        eph: number;
        epv: number;
        lat: number;
        lon: number;
    } | null;
    vehicleOdometry: {
        position: {
            x: number;
            y: number;
            z: number;
        };
        speed: number;
        velocity: {
            x: number;
            y: number;
            z: number;
        }
    } | null;
    battery: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ globalPosition, vehicleOdometry, battery }) => {
    const [isCurrentStatusExpanded, setIsCurrentStatusExpanded] = useState(true);
    const [isMissionStatusExpanded, setIsMissionStatusExpanded] = useState(true);

    const toggleCurrentStatusExpand = () => {
        setIsCurrentStatusExpanded((prev) => !prev);
    };

    const toggleMissionStatusExpand = () => {
        setIsMissionStatusExpanded((prev) => !prev);
    };

    return (
        <div className="sidebar">
            <CurrentStatus
                isExpanded={isCurrentStatusExpanded}
                toggleExpand={toggleCurrentStatusExpand}
                globalPosition={globalPosition}
                vehicleOdometry={vehicleOdometry}
                battery={battery}
            />
            <MissionStatus
                isExpanded={isMissionStatusExpanded}
                toggleExpand={toggleMissionStatusExpand}
            />
        </div>
    );
};

export default Sidebar;