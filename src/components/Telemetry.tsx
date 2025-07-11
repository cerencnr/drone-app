import React from 'react';
import Card from "antd/es/card";
import { GPSResponse } from "../api/models";
import './Telemetry.css';

const Telemetry: React.FC<{ position: GPSResponse['drone']['position']}> = ({ position }) => {
    if (!position) {
        return <div>No telemetry data available.</div>;
    }

    return (
        <div className={"telemetry-container"}
             style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Card title="UAV Telemetry" size="small" style={{width: 200}}>
                <p>Altitude: {position?.abs_alt.toFixed(5)}</p>
                <p>Latitude: {position?.latitude.toFixed(5)}</p>
                <p>Longitude: {position?.longitude.toFixed(5)}</p>
            </Card>
        </div>
    );
}

export default Telemetry;