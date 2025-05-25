import React from "react";
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import Tooltip from "antd/es/tooltip";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded';
import useReturnToLaunch from "../hooks/useReturnToLaunch";
import {notifyReturnError, notifyReturnSuccess} from "../utils/notify";
import './Menu.css';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import Telemetry from "./Telemetry";
import {GPSResponse} from "../api/models";

interface MenuProps {
    showPolygon: boolean;
    createPolygon: () => void;
    isFocusing: boolean;
    toggleFocus: () => void;
    isTracking: boolean;
    toggleTelemetry: () => void;
    isTelemetryExpanded: boolean;
    position: GPSResponse['drone']['position'] | null
}

const Menu: React.FC<MenuProps> = ({
                                       showPolygon,
                                       createPolygon,
                                       isFocusing,
                                       toggleFocus,
                                       isTracking,
                                       toggleTelemetry,
                                       isTelemetryExpanded,
                                       position,
                                   }) => {
    const {triggerReturnToLaunch} = useReturnToLaunch();

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

                <div className="menu-items">
                    <Tooltip placement={"left"} title={"Toggle Area"}>
                        <button onClick={createPolygon} className="menu-button">
                            {showPolygon ? <PentagonOutlinedIcon/> : <PolylineOutlinedIcon/>}
                        </button>
                    </Tooltip>

                    <Tooltip placement={"left"} title={"Return to Base"}>
                        <button className="menu-button" onClick={handleReturnToLaunch} disabled={!isTracking}>
                            <UndoRoundedIcon/>
                        </button>
                    </Tooltip>

                    <Tooltip placement={"left"} title={isFocusing ? "Stop Focusing on Drone" : "Focus on Drone"}>
                        <button className="menu-button" onClick={toggleFocus}
                                style={isFocusing ? {backgroundColor: "#c9c9c9"} : {}}>
                            <CenterFocusWeakRoundedIcon/>
                        </button>
                    </Tooltip>
                </div>

                <Tooltip placement={"left"} title={"Telemetry Data"}>
                    <button className="menu-button" onClick={toggleTelemetry}>
                        <RocketLaunchRoundedIcon/>
                    </button>
                    {isTelemetryExpanded && position && (
                        <div
                            style={{position: "relative", top: "-390%", left: "-590%"}}>
                            <Telemetry position={position}/>
                        </div>
                    )}
                </Tooltip>

            </div>
        </div>
    );
};

    export default Menu;