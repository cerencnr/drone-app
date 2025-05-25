import React from 'react';
import List from 'antd/es/list';

interface WaypointListProps {
    markers: [number, number][];
    onWaypointClick?: (position: [number, number]) => void;
    isLoading: boolean;
}

const WaypointList: React.FC<WaypointListProps> = ({ markers, onWaypointClick, isLoading }) => {
    return (
        <List
            style={{
                overflow: "auto",
                maxHeight: "30rem",
                borderRadius: "5px",
                backgroundColor: "white",
                width: "22rem",
                border: "none"
            }}
            loading={isLoading}
            itemLayout="horizontal"
            size="small"
            header={<div>Waypoints</div>}
            bordered
            dataSource={markers}
            renderItem={(marker, index) => (
                <List.Item
                    onClick={() => onWaypointClick && onWaypointClick(marker)} // Call the click handler
                    style={{ cursor: "pointer" }}
                >
                    <List.Item.Meta
                        title={`Waypoint ${index + 1}`}
                        description={marker && marker[0] != null && marker[1] != null ? `Latitude: ${marker[0].toFixed(5)} Longitude: ${marker[1].toFixed(5)}` : "Invalid marker"}
                    />
                </List.Item>
            )}
        />
    );
};

export default WaypointList;
