import React from 'react';
import Card from "antd/es/card";
import { GPSResponse } from "../api/models";
import './Telemetry.css';

const Telemetry: React.FC<{ globalPosition: GPSResponse['global_position'], position: GPSResponse['vehicle_odometry']['position'] }> = ({ globalPosition, position }) => (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Card title="Telemetry" size="small" style={{ width: 200 }}>
                <p>Altitude: {globalPosition.alt.toFixed(2)}</p>
                <p>Latitude: {globalPosition.lat.toFixed(2)}</p>
                <p>Longitude: {globalPosition.lon.toFixed(2)}</p>
            </Card>
            <Card title="Position" size="small" style={{ width: 200 }}>
                <p>x: {position.x.toFixed(2)}</p>
                <p>y: {position.y.toFixed(2)}</p>
                <p>z: {position.z.toFixed(2)}</p>
            </Card>
    </div>
);

export default Telemetry;