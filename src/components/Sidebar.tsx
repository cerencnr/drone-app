import React, { useState } from "react";
import './Sidebar.css';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import Tooltip from "antd/es/tooltip";
import AddWaypointButton from "./AddWaypointButton";
import WaypointList from "./WaypointList";
import {clearMission} from "../api/mission-api";

interface SidebarProps {
    isAdding: boolean;
    handleToggleAdding: () => void;
    markers: [number, number][];
    focusOnWaypoint: (position: [number, number]) => void;
    isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isAdding,
                                           handleToggleAdding,
                                           markers,
                                           focusOnWaypoint,
                                           isLoading}) => {
    const [isSectionExpanded, setIsSectionExpanded] = useState(true);


    const toggleExpandSection = () => {
        setIsSectionExpanded((prev) => !prev);
    }

    const removeAllMissions= async () => {
        await clearMission();
    }

    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={toggleExpandSection}>
                <Tooltip title={"Plan"} placement={"right"}>
                    <NavigationRoundedIcon />
                </Tooltip>
            </div>
            {isSectionExpanded && (
                <div className="section"> {/* mission plan section */}
                    <p style={{fontWeight: "bold", fontSize: "0.8rem", paddingTop: "0", margin: "0"}}>Create Plan</p>
                    <AddWaypointButton isAdding={isAdding} handleToggleAdding={handleToggleAdding}/>
                    <button style={{border: "none",
                                    borderRadius: "5px",
                                    backgroundColor: "white"}} onClick={removeAllMissions}>clear all</button>
                    <WaypointList markers={markers} onWaypointClick={focusOnWaypoint} isLoading={isLoading}/>
                </div>
            )}

        </div>
    );
};

export default Sidebar;


/*
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
 */