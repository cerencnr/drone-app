import React, {CSSProperties, useState} from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const searchBarStyle: CSSProperties = {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "5px",
    top: "10px",
    left: "10px",
    zIndex: 1000,
    display: "flex",
};

const inputField: CSSProperties = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
};

const buttonStyle: CSSProperties = {
    backgroundColor: "white",
    border: "none",
    cursor: "pointer",
    marginLeft: "5px",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};


const SearchBar: React.FC<{ onLocationFound: (position: [number, number]) => void }> = ({ onLocationFound }) => {
    const [address, setAddress] = useState("");

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                onLocationFound([parseFloat(lat), parseFloat(lon)]);
                setAddress(""); // Clear the search bar
            } else {
                alert("Address not found.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <div style={searchBarStyle}>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                style={inputField}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button style={buttonStyle} onClick={handleSearch}><SearchRoundedIcon/></button>
        </div>
    );
};

export default SearchBar;