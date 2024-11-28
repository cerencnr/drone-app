import React from "react";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { calculateTotalDistance } from "../utils/calculateDistance";

interface CurrentStatusProps {
    isExpanded: boolean;
    toggleExpand: () => void;
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

const CurrentStatus: React.FC<CurrentStatusProps> = ({ isExpanded, toggleExpand, globalPosition, vehicleOdometry, battery }) => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Speed',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{vehicleOdometry?.speed?.toFixed(2) || 'N/A'}</p>,
        },
        {
            key: '2',
            label: 'Height',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{globalPosition?.alt?.toFixed(2) || 'N/A'}</p>,
        },
        {
            key: '3',
            label: 'Flight Time',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{'N/A'}</p>,
        },
        {
            key: '4',
            label: 'Battery',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{typeof battery === 'number' ? (battery * 100).toFixed(0) + "%" : 'N/A'}</p>,
        },
        { // TODO: Test it
            key: '5',
            label: 'Total Distance',
            children: //<p style={{fontWeight: "bold", margin: "0"}}>
            //{globalPosition && vehicleOdometry ? calculateTotalDistance([{ lat: globalPosition.lat, lon: globalPosition.lon }, { lat: vehicleOdometry.position.x, lon: vehicleOdometry.position.y }]).toFixed(2) + " meters" : 'N/A'}</p>,
                <p style={{fontWeight: "bold", margin: "0"}}>{'N/A'}</p>
        },
    ];

    return (
        <div className="sidebar-item">
            <p
                style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    userSelect: "none",
                    margin: "0",
                }}
                onClick={toggleExpand}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: "white",
                        height: "2rem"
                    }}
                >
                    <div style={{display: "flex", alignItems: "center"}}>
                        {isExpanded ? <KeyboardArrowRightRoundedIcon/> : <KeyboardArrowDownRoundedIcon/>}
                    </div>
                    <span style={{display: "inline-block", margin: 0}}>Current Status</span>
                </div>
            </p>
            {isExpanded && (
                <Descriptions
                    items={items}
                    layout="vertical"
                    size="small"
                    style={{width: "16rem", padding: "10px", backgroundColor: "#f0f0f0"}}
                />
            )}
        </div>
    );
};

export default CurrentStatus;