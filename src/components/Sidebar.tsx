import React, { useState } from "react";
import './Sidebar.css';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import Tooltip from "antd/es/tooltip";
import AddWaypointButton from "./AddWaypointButton";
import WaypointList from "./WaypointList";
import {clearMission} from "../api/mission-api";
import useStartMission from "../hooks/useStartMission";
import useStartLawnmowerMission from "../hooks/useStartLawnmowerMission";

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
    const {start: startGenericMission} = useStartMission();
    const {start: startLawnmowerMission} = useStartLawnmowerMission();

    const toggleExpandSection = () => {
        setIsSectionExpanded((prev) => !prev);
    }

    const removeAllMissions = async () => {
        try {
            await clearMission();
        } catch (err) {
            console.error("Clear mission failed:", err);
        }
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
                    <button
                        style={{
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "white",
                            fontWeight: "bold"
                        }}
                        onClick={removeAllMissions}>
                        Clear All
                    </button>
                    <button style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        fontWeight: "bold"
                    }}
                            onClick={startGenericMission}>Start Generic Mission
                    </button>
                    <button style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        fontWeight: "bold"
                    }}
                            onClick={startLawnmowerMission}>Start Lawnmower Mission
                    </button>
                    <WaypointList markers={markers} onWaypointClick={focusOnWaypoint} isLoading={isLoading}/>
                </div>
            )}

        </div>
    );
};

export default Sidebar;