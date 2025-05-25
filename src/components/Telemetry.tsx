import React from 'react';
import Card from "antd/es/card";
import { GPSResponse } from "../api/models";
import './Telemetry.css';

const Telemetry: React.FC<{ position: GPSResponse['position']}> = ({ position }) => {
    if (!position) {
        return <div>No telemetry data available.</div>;
    }

    return (
        <div className={"telemetry-container"}
             style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Card title="Telemetry" size="small" style={{width: 200}}>
                <p>Altitude: {position?.absoluteAltitude}</p>
                <p>Latitude: {position?.latitude}</p>
                <p>Longitude: {position?.longitude}</p>
            </Card>
        </div>
    );
}

export default Telemetry;