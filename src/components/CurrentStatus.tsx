import React from "react";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import { horizontalDistanceTraveled } from "../utils/horizontalDistanceTraveled";

interface CurrentStatusProps {
    markers: [number, number][];
    armed: boolean | null;
    position: {
        absoluteAltitude: number;
        latitude: number;
        longitude: number;
        relativeAltitude: number;
    } | null;
    flightMode: number | null;
    battery: {
        remainingPercent: number;
        voltage: number;
    } | null;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({
                                                         position,
                                                         battery,
                                                         markers,
                                                         armed,
                                                         flightMode
}) => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Speed',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{'N/A'}</p>,
        },
        {
            key: '2',
            label: 'Height',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{position?.absoluteAltitude?.toFixed(2) || 'N/A'}</p>,
        },
        {
            key: '3',
            label: 'Flight Time',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{'N/A'}</p>,
        },
        {
            key: '4',
            label: 'Battery',
            children: (
                <p style={{fontWeight: "bold", margin: "0"}}>
                    {battery?.remainingPercent != null
                        ? (battery.remainingPercent).toFixed(0) + "%"
                        : "N/A"}
                </p>
            ),
        },
        {
            key: '5',
            label: 'Total Distance',
            children: (
                <p style={{fontWeight: "bold", margin: "0"}}>
                {markers.length > 1
                        ? (horizontalDistanceTraveled(markers) / 1000).toFixed(2) + " km"
                        : "N/A"}
                </p>
            ),
        },
    ];

    return (
        <Descriptions
            bordered
            items={items}
            layout="vertical"
            style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        />
    );
};

export default CurrentStatus;