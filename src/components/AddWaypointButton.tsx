import React from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../pages/Map/Map.css';

interface AddWaypointProps {
    isAdding: boolean;
    handleToggleAdding: () => void;
}

const AddWaypointButton: React.FC<AddWaypointProps> = ({ isAdding, handleToggleAdding }) => {
    return (
        <div style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    width: "fit-content"}}>
            <button
                onClick={handleToggleAdding}
                style={{background: "none", border: "none", cursor: "pointer"}}
            >
                {isAdding ?
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <CloseRoundedIcon color='error'/>
                        <p style={{fontWeight: "bold", color: "red", paddingRight: "5px"}}>Stop Adding</p>
                    </div> :
                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                        <AddLocationAltOutlinedIcon/>
                        <p style={{fontWeight: "bold", paddingRight: "5px"}}>Add Waypoint</p>
                    </div>}
            </button>
        </div>
    );
};

export default AddWaypointButton;