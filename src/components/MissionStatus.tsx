import React from "react";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

interface MissionStatusProps {
    isExpanded: boolean;
    toggleExpand: () => void;
}

const MissionStatus: React.FC<MissionStatusProps> = ({ isExpanded, toggleExpand }) => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Mission Detail 1',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{'Detail 1'}</p>,
        },
        {
            key: '2',
            label: 'Mission Detail 2',
            children: <p style={{fontWeight: "bold", margin: "0"}}>{'Detail 2'}</p>,
        },
        // Add more mission details as needed
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
                    <span style={{display: "inline-block", margin: 0}}>Mission Status</span>
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

export default MissionStatus;