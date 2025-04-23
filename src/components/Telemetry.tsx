import React from 'react';
import Card from "antd/es/card";
import { GPSResponse } from "../api/models";
import './Telemetry.css';

const Telemetry: React.FC<{ position: GPSResponse['position']}> = ({ position }) => (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Card title="Telemetry" size="small" style={{ width: 200 }}>
                <p>Altitude: {position.absolute_altitude.toFixed(2)}</p>
                <p>Latitude: {position.latitude.toFixed(2)}</p>
                <p>Longitude: {position.longitude.toFixed(2)}</p>
            </Card>
    </div>
);

export default Telemetry;