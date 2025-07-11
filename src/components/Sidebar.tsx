import React, { useState } from "react";
import './Sidebar.css';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import Tooltip from "antd/es/tooltip";
import AddWaypointButton from "./AddWaypointButton";
import WaypointList from "./WaypointList";
import {clearMission, startLawnmowerMission} from "../api/mission-api";
import useStartMission from "../hooks/useStartMission";
import useStartLawnmowerMission from "../hooks/useStartLawnmowerMission";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import CurrentStatus from "./CurrentStatus";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
    notifyGenerateLawnmowerMissionError, notifyGenerateLawnmowerMissionSuccess,
    notifyStartGenericMissionError,
    notifyStartGenericMissionSuccess, notifyStartLawnmowerMissionError,
    notifyStartLawnmowerMissionSuccess
} from "../utils/notify";
import useMission from "../hooks/useMission";
import {generateLawnmower} from "../api/mission-api";
import {LawnmowerMissionResponse} from "../api/models";

interface SidebarProps {
    isAdding: boolean;
    handleToggleAdding: () => void;
    markers: [number, number][];
    focusOnWaypoint: (position: [number, number]) => void;
    isLoading: boolean;
    armed: boolean | null;
    position: {
        abs_alt: number;
        latitude: number;
        longitude: number;
        rel_alt: number;
    } | null;
    flightMode: number | null;
    battery: {
        remainingPercent: number;
        voltage: number;
    } | null;
    onStartSession: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isAdding,
                                           handleToggleAdding,
                                           markers,
                                           focusOnWaypoint,
                                           isLoading,
                                           battery,
                                           armed,
                                           position,
                                           flightMode,
                                           onStartSession
}) => {
    const [isMissionSectionExpanded, setIsMissionSectionExpanded] = useState(false);
    const [isCurrentStatusSectionExpanded, setIsCurrentStatusSectionExpanded] = useState(false);
    const {start: startGenericMission} = useStartMission();
    const { mutate } = useMission();

    const toggleExpandMissionSection = () => {
        setIsMissionSectionExpanded((prev) => {
            if (!prev) setIsCurrentStatusSectionExpanded(false);
            return !prev;
        });
    }

    const toggleExpandCurrentStatusSection = () => {
        setIsCurrentStatusSectionExpanded((prev) => {
            if (!prev) setIsMissionSectionExpanded(false);
            return !prev;
        });
    }

    const removeAllMissions = async () => {
        try {
            await clearMission();
            mutate();
        } catch (err) {
            console.error("Clear mission failed:", err);
        }
    }

    const handleStartGenericMission = async () => {
        try {
            const response = await startGenericMission();
            if (response?.status === 200) {
                notifyStartGenericMissionSuccess();
                onStartSession();
                mutate();
            } else {
                notifyStartGenericMissionError();
            }
        } catch (err) {
            console.error("Failed to start generic mission:", err);
            notifyStartGenericMissionError();
        }
    };

    const handleStartLawnmowerMission = async () => {
        try {
            const response = await startLawnmowerMission();
            if (response?.status === 200) {
                notifyStartLawnmowerMissionSuccess();
                onStartSession();
                mutate();
            } else {
                notifyStartLawnmowerMissionError();
            }
        } catch (err) {
            console.error("Failed to start lawnmower mission:", err);
            notifyStartLawnmowerMissionError();
        }
    };

    const handleGenerateLawnmowerMission = async () => {
        if (!markers || markers.length < 3) {
            console.error("Polygon needs at least 3 points.");
            notifyGenerateLawnmowerMissionError();
            return;
        }

        const polygon = markers.map(([lat, lng]) => ({
            latitude: lat,
            longitude: lng
        }));

        const lawnmowerMission: LawnmowerMissionResponse = {
            polygon,
            spacing: 10,
            scouting_altitude: 20,
            execution_altitude: 15,
            speed: 5,
        };

        try {
            await generateLawnmower(lawnmowerMission);
            notifyGenerateLawnmowerMissionSuccess();
            mutate();
        } catch (err) {
            console.error("Failed to generate lawnmower mission:", err);
            notifyGenerateLawnmowerMissionError();
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={toggleExpandMissionSection}>
                <Tooltip title={"Plan"} placement={"right"}>
                    <NavigationRoundedIcon/>
                </Tooltip>
            </div>
            {isMissionSectionExpanded && (
                <div className="section"> {/* mission plan section */}
                    <p style={{fontWeight: "bold", fontSize: "0.8rem", paddingTop: "0", margin: "0"}}>Create Plan</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <AddWaypointButton isAdding={isAdding} handleToggleAdding={handleToggleAdding}/>

                    </div>
                    <WaypointList markers={markers} onWaypointClick={focusOnWaypoint} isLoading={isLoading}/>
                    <button className={"mission-button"}
                            onClick={handleGenerateLawnmowerMission}
                    >
                        Generate Lawnmower Mission
                    </button>
                    <button className={"mission-button"}
                            onClick={handleStartLawnmowerMission}
                    >
                        Start Lawnmower Mission
                    </button>
                </div>
            )}

            <div className="sidebar-item" onClick={toggleExpandCurrentStatusSection}>
                <Tooltip title={"Current Status"} placement={"right"}>
                    <RocketLaunchRoundedIcon/>
                </Tooltip>
            </div>
            {isCurrentStatusSectionExpanded && (
                <div className="section">
                    <p style={{fontWeight: "bold", fontSize: "0.8rem", paddingTop: "0", margin: "0"}}>Current Status</p>
                    <CurrentStatus
                        position={null}
                        battery={battery}
                        markers={markers}
                        armed={false}
                        flightMode={null}
                    />
                </div>
            )}

        </div>
    );
};

export default Sidebar;