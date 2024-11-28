import React from "react";
import AddWaypointButton from './AddWaypointButton';
import WaypointList from './WaypointList';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import Tooltip from "antd/es/tooltip";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded';
import useReturnToLaunch from "../hooks/useReturnToLaunch";
import { notifyReturnError, notifyReturnSuccess } from "../utils/notify";
import './Menu.css';

interface MenuProps {
    isAdding: boolean;
    handleToggleAdding: () => void;
    isExpanded: boolean;
    toggleExpand: () => void;
    markers: [number, number][];
    focusOnWaypoint: (position: [number, number]) => void;
    showPolygon: boolean;
    createPolygon: () => void;
    isFocusing: boolean;
    toggleFocus: () => void;
    isTracking: boolean;
}

const Menu: React.FC<MenuProps> = ({
                                       isAdding,
                                       handleToggleAdding,
                                       isExpanded,
                                       toggleExpand,
                                       markers,
                                       focusOnWaypoint,
                                       showPolygon,
                                       createPolygon,
                                       isFocusing,
                                       toggleFocus,
                                       isTracking
                                   }) => {
    const { triggerReturnToLaunch } = useReturnToLaunch();

    const handleReturnToLaunch = async () => {
        try {
            const response = await triggerReturnToLaunch();
            if (response) {
                notifyReturnSuccess();
                console.log("Return to base successful:", response);
            } else {
                console.warn("Return to base already in progress or no action performed.");
            }
        } catch (error) {
            notifyReturnError();
            console.error("Return to base failed:", error);
        }
    };

    return (
        <div className="menu">
            <div className="menu-items">
                <Tooltip placement={"left"} title={"Add Waypoint"}>
                    <span>
                        <AddWaypointButton isAdding={isAdding} handleToggleAdding={handleToggleAdding} />
                    </span>
                </Tooltip>

                <div style={{ display: "flex", gap: "10px" }}>
                    <div className={`waypoint-list-container ${isExpanded ? 'expanded' : ''}`}>
                        {isExpanded && (
                            <WaypointList markers={markers} onWaypointClick={focusOnWaypoint} />
                        )}
                    </div>
                    <Tooltip placement={"left"} title={"See All Waypoints"}>
                        <span>
                            <button onClick={toggleExpand} className={`menu-button${isExpanded ? '-active' : ''}`}>
                                {isExpanded ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                            </button>
                        </span>
                    </Tooltip>
                </div>

                <Tooltip placement={"left"} title={"Toggle Area"}>
                    <button onClick={createPolygon} className="menu-button">
                        {showPolygon ? <PentagonOutlinedIcon /> : <PolylineOutlinedIcon />}
                    </button>
                </Tooltip>

                <Tooltip placement={"left"} title={"Return to Base"}>
                    <span>
                        <button className="menu-button" onClick={handleReturnToLaunch} disabled={!isTracking}>
                            <UndoRoundedIcon/>
                        </button>
                    </span>
                </Tooltip>

                <Tooltip placement={"left"} title={isFocusing ? "Stop Focusing on Drone" : "Focus on Drone"}>
                    <span>
                        <button className="menu-button" onClick={toggleFocus} style={isFocusing ? { backgroundColor: "#c9c9c9" } : {}}>
                            <CenterFocusWeakRoundedIcon />
                        </button>
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};

export default Menu;