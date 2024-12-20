import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './Map.css';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import SearchBar from '../../components/SearchBar';
import useGPS from "../../hooks/useGPS";
import Menu from '../../components/Menu';
import Sidebar from '../../components/Sidebar';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import Tooltip from "antd/es/tooltip";

const markerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

const droneIcon = new L.Icon({
    iconUrl: "https://svgsilh.com/svg/2025680.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
});

const MapEvents: React.FC<{ addMarker: (pos: [number, number]) => void; isAdding: boolean; setIsAdding: React.Dispatch<React.SetStateAction<boolean>> }> = ({ addMarker, isAdding, setIsAdding }) => {
    useMapEvent("click", (e: L.LeafletMouseEvent) => {
        if (isAdding) {
            addMarker([e.latlng.lat, e.latlng.lng]);
        }
    });
    return null;
};

const Map: React.FC = () => {
    const [isTracking, setIsTracking] = useState(false);
    const { globalPosition, vehicleOdometry, battery } = useGPS(isTracking);
    const [dronePosition, setDronePosition] = useState<[number, number]>([0, 0]);
    const [droneTrajectory, setDroneTrajectory] = useState<[number, number][]>([]);
    const [markers, setMarkers] = useState<[number, number][]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    const [showPolygon, setShowPolygon] = useState(false);
    const [isFocusing, setIsFocusing] = useState(false);



    useEffect(() => {
        if (globalPosition) {
            const newDronePosition: [number, number] = [globalPosition?.lat, globalPosition?.lon];
            setDronePosition(newDronePosition);
            setDroneTrajectory((prevTrajectory) => [...prevTrajectory, newDronePosition]);
        }
    }, [globalPosition]);

    useEffect(() => {
        if (mapRef.current && dronePosition[0] !== 0 && dronePosition[1] !== 0 && isFocusing) {
            mapRef.current.flyTo(dronePosition, 18);
        }
    }, [dronePosition, isFocusing]);

    const toggleTracking = () => {
        setIsTracking((prev) => {
            const newTrackingState = !prev;
            setIsFocusing(newTrackingState);
            if (!newTrackingState) {
                setDronePosition([0, 0]);
                setDroneTrajectory([]);
            }
            return newTrackingState;
        });
    };

    const onLocationFound = (position: [number, number]) => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, 16);
            setMarkers((prevMarkers) => [...prevMarkers, position]);
        }
    };

    const addMarker = (position: [number, number]) => {
        setMarkers((prevMarkers) => [...prevMarkers, position]);
    };

    const deleteMarker = (index: number) => {
        setMarkers((prevMarkers) => {
            const updatedMarkers = prevMarkers.filter((_, i) => i !== index);
            if (updatedMarkers.length < 3 && showPolygon) {
                setShowPolygon(false);
            }
            return updatedMarkers;
        });
    };

    const updateMarkerPosition = (index: number, position: [number, number]) => {
        setMarkers((prevMarkers) => prevMarkers.map((marker, i) => (i === index ? position : marker)));
    };

    const handleToggleAdding = () => {
        setIsAdding((prev) => !prev);
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const focusOnWaypoint = (position: [number, number]) => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, 16);
        }
    };

    const createPolygon = () => {
        if (markers.length >= 3) {
            setShowPolygon((prev) => !prev);
        } else {
            alert("At least 3 waypoints are needed to form an area.");
        }
    };

    const toggleFocus = () => {
        setIsFocusing((prev) => !prev);
    };

    return (
        <div className="app">
            <Sidebar globalPosition={globalPosition} vehicleOdometry={vehicleOdometry} battery={battery} />
            <div className="map-container">

                <Menu
                    isAdding={isAdding}
                    handleToggleAdding={handleToggleAdding}
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                    markers={markers}
                    focusOnWaypoint={focusOnWaypoint}
                    showPolygon={showPolygon}
                    createPolygon={createPolygon}
                    isFocusing={isFocusing}
                    toggleFocus={toggleFocus}
                    isTracking={isTracking}
                />
                <MapContainer
                    center={[37.9838, 23.7275]}
                    zoom={5}
                    style={{height: "100%", width: "100%"}}
                    whenReady={() => {
                        if (mapRef.current) {
                            console.log("Map is ready");
                        }
                    }}
                    ref={mapRef}
                    zoomControl={false}
                >
                    <SearchBar onLocationFound={onLocationFound}/>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents addMarker={addMarker} isAdding={isAdding} setIsAdding={setIsAdding}/>
                    <Polyline positions={markers}/>
                    {showPolygon && markers.length >= 3 && (
                        <Polygon positions={markers}/>
                    )}
                    {markers.map((position, index) => (
                        <Marker
                            key={index}
                            position={position}
                            icon={markerIcon}
                            draggable={true}
                            eventHandlers={{
                                dragend: (e) => {
                                    const marker = e.target;
                                    const newPosition: [number, number] = [marker.getLatLng().lat, marker.getLatLng().lng];
                                    updateMarkerPosition(index, newPosition);
                                },
                                click: () => {
                                    if (isAdding) {
                                        setIsAdding(false);
                                    }
                                }
                            }}
                        >
                            <Popup>
                                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"2px"}}>
                                    {position[0].toFixed(5)}, {position[1].toFixed(5)}
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <Tooltip placement={"left"} title={"Delete Marker"}>
                                            <button onClick={() => deleteMarker(index)}
                                                    style={{background: "transparent", border: "none", padding: "2px"}}>
                                                <WrongLocationOutlinedIcon style={{color: "red"}}/>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    <Marker position={dronePosition} icon={droneIcon}>
                        <Popup>
                            Drone Position
                            <br/>
                            Latitude: {dronePosition[0].toFixed(5)}
                            <br/>
                            Longitude: {dronePosition[1].toFixed(5)}
                        </Popup>
                    </Marker>
                    <Polyline positions={droneTrajectory} color="blue"/>
                </MapContainer>
                <button onClick={toggleTracking}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: "2000",
                            height: "2.2rem",
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}>
                    {isTracking ?
                        <div style={{display:"flex", alignItems: "center"}}>
                            <StopRoundedIcon />
                            <p style={{margin:"0", padding:"2px"}}>Halt Session</p>
                        </div> :
                        <div style={{display:"flex", alignItems: "center"}}>
                            <PlayArrowRoundedIcon />
                            <p style={{margin:"0", padding:"2px"}}>Start Session</p>
                        </div>}
                </button>
            </div>
        </div>
    );
};

export default Map;