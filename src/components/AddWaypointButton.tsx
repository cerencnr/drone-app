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
        <button
            onClick={handleToggleAdding}
            className={`menu-button${isAdding ? "-active" : ""}`}
        >
            {isAdding ? <CloseRoundedIcon /> : <AddLocationAltOutlinedIcon />}
        </button>
    );
};

export default AddWaypointButton;