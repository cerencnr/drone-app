import React from 'react';
import List from 'antd/es/list';

interface WaypointListProps {
    markers: [number, number][];
    onWaypointClick?: (position: [number, number]) => void; // Optional click handler
}

const WaypointList: React.FC<WaypointListProps> = ({ markers, onWaypointClick }) => {
    return (
        <List
            style={{
                overflow: "auto",
                maxHeight: "30rem",
                borderRadius: "5px",
                backgroundColor: "white",
                boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2)",
                width: "22rem"
            }}
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
                        description={`Latitude: ${marker[0].toFixed(5)} Longitude: ${marker[1].toFixed(5)}`}
                    />
                </List.Item>
            )}
        />
    );
};

export default WaypointList;
