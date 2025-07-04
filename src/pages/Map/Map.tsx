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
import Tooltip from "antd/es/tooltip";
import useMission from "../../hooks/useMission";
import useMarkers from "../../hooks/useMarkers";
import TrackingButton from "../../components/TrackingButton";
import {notifyTelemetryWarning} from "../../utils/notify";
import 'leaflet-rotatedmarker';
import droneArrowhead from "../../assets/drone-arrowhead.svg";
import roverArrowhead from "../../assets/rover-arrowhead.svg";


const markerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

const droneIcon = new L.Icon({
    iconUrl: droneArrowhead,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
});

const roverIcon = new L.Icon({
    iconUrl: roverArrowhead,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
    className: "faded-icon"
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
    const { markers, addMarker, deleteMarker, updateMarker } = useMarkers();
    const [isTracking, setIsTracking] = useState(false);
    const { drone, rover } = useGPS(isTracking);
    const [dronePosition, setDronePosition] = useState<[number, number]>([0, 0]);
    const [roverPosition, setRoverPosition] = useState<[number, number]>([0, 0]);
    const [droneTrajectory, setDroneTrajectory] = useState<[number, number][]>([]);
    const [roverTrajectory, setRoverTrajectory] = useState<[number, number][]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    const [showPolygon, setShowPolygon] = useState(false);
    const [focusTarget, setFocusTarget] = useState<"none" | "drone" | "rover">("none");
    const { data: missions, isLoading } = useMission();
    const [ isTelemetryExpanded, setIsTelemetryExpanded ] = useState(false);
    const [hidePolylineTemporarily, setHidePolylineTemporarily] = useState(false);
    const [droneArrowHeading, setDroneArrowHeading] = useState(0);
    const [roverArrowHeading, setRoverArrowHeading] = useState(0);
    const droneMarkerRef = useRef<L.Marker | null>(null);
    const roverMarkerRef = useRef<L.Marker | null>(null);


    useEffect(() => {
        if (droneMarkerRef.current) {
            (droneMarkerRef.current as any).setRotationAngle(droneArrowHeading);
            (droneMarkerRef.current as any).setRotationOrigin("center center");
        }
    }, [droneArrowHeading]);

    useEffect(() => {
        if (roverMarkerRef.current) {
            (roverMarkerRef.current as any).setRotationAngle(roverArrowHeading);
            (roverMarkerRef.current as any).setRotationOrigin("center center");
        }
    }, [roverArrowHeading]);

    const startSession = () => {
        setIsTracking(true);
        setFocusTarget("drone");
    };

    useEffect(() => {
        if (drone?.position && drone?.heading) {
            const newDronePosition: [number, number] = [drone?.position?.latitude, drone?.position?.longitude];
            setDronePosition(newDronePosition);
            setDroneTrajectory((prevTrajectory) => [...prevTrajectory, newDronePosition]);
            setDroneArrowHeading(drone?.heading ?? 0);
        }
    }, [drone?.position]);

    useEffect(() => {
        if (rover?.position && rover?.heading) {
            const newRoverPosition: [number, number] = [rover?.position?.latitude, rover?.position?.longitude];
            setRoverPosition(newRoverPosition);
            setRoverTrajectory((prevTrajectory) => [...prevTrajectory, newRoverPosition]);
            setRoverArrowHeading(rover?.heading ?? 0);
        }
    }, [rover?.position]);

    useEffect(() => {
        if (mapRef.current && dronePosition[0] !== 0 && dronePosition[1] !== 0 && (focusTarget === "drone")) {
            mapRef.current.flyTo(dronePosition, 18);
        }
    }, [dronePosition, focusTarget]);

    useEffect(() => {
        if (mapRef.current && roverPosition[0] !== 0 && roverPosition[1] !== 0 && (focusTarget === "rover")) {
            mapRef.current.flyTo(roverPosition, 18);
        }
    }, [roverPosition, focusTarget]);

    const toggleTracking = () => {
        setIsTracking((prev) => {
            const newTrackingState = !prev;
            setFocusTarget("drone");
            if (!newTrackingState) {
                setDronePosition([0, 0]);
                setDroneTrajectory([]);
            }
            return newTrackingState;
        });
    };

    const onLocationFound = (position: [number, number]) => {
        addMarker(position).then(
            () => {
                if (mapRef.current) {
                    mapRef.current.flyTo(position, 16);
                }
            }
        )
        .catch((error) => {
            console.error("Error adding marker:", error);
        }
        );
    };

    const handleToggleAdding = () => {
        setIsAdding((prev) => !prev);
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
        if (focusTarget === "none") {
            setFocusTarget("drone");
        } else if (focusTarget === "drone") {
            setFocusTarget("rover");
        } else {
            setFocusTarget("none");
        }

        if (!focusTarget) {
            setHidePolylineTemporarily(true);
            setTimeout(() => {
                setHidePolylineTemporarily(false);
            }, 200);
        }
    };

    const toggleTelemetry = () => {
        if (!drone?.position) {
            notifyTelemetryWarning();
            return;
        }
        setIsTelemetryExpanded((prev) => !prev);
    }


    return (
        <div className="app">
            <Sidebar isAdding={isAdding}
                     handleToggleAdding={handleToggleAdding}
                     markers={markers}
                     focusOnWaypoint={focusOnWaypoint}
                     isLoading={isLoading}
                     battery={drone?.battery ?? null}
                     flightMode={drone?.flightMode ?? null}
                     armed={drone?.armed ?? null}
                     position={drone?.position ?? null}
                     onStartSession={startSession}
            />
            <div className="map-container">

                <Menu
                    showPolygon={showPolygon}
                    createPolygon={createPolygon}
                    focusTarget={focusTarget}
                    toggleFocus={toggleFocus}
                    isTracking={isTracking}
                    toggleTelemetry={toggleTelemetry}
                    isTelemetryExpanded={isTelemetryExpanded}
                    position={drone?.position ?? null}
                />
                <MapContainer
                    center={[37.9838, 23.7275]}
                    zoom={5}
                    maxZoom={20}
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
                        maxZoom={20}
                        maxNativeZoom={18}
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapEvents addMarker={addMarker} isAdding={isAdding} setIsAdding={setIsAdding}/>
                    {!hidePolylineTemporarily && <Polyline positions={markers} />}
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
                                    updateMarker(index, newPosition);
                                },
                                click: () => {
                                    if (isAdding) {
                                        setIsAdding(false);
                                    }
                                }
                            }}
                        >
                            <Popup>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                                    {position && (
                                        <>
                                            {position[0]}, {position[1]}
                                        </>
                                    )}
                                    <br />
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Tooltip placement={"left"} title={"Delete Marker"}>
                                            <button
                                                onClick={() => deleteMarker(index)}
                                                style={{ background: "transparent", border: "none", padding: "2px" }}
                                            >
                                                <WrongLocationOutlinedIcon style={{ color: "red" }} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    <Marker
                        position={dronePosition}
                        icon={droneIcon}
                        ref={(ref) => {
                            if (ref) droneMarkerRef.current = ref;
                        }}
                    >
                        <Popup>
                            Drone Position<br />
                            Lat: {dronePosition[0]} <br />
                            Lon: {dronePosition[1]} <br />
                            Heading: {droneArrowHeading.toFixed(1)}°
                        </Popup>
                    </Marker>

                    <Marker
                        position={roverPosition}
                        icon={roverIcon}
                        ref={(ref) => {
                            if (ref) roverMarkerRef.current = ref;
                        }}
                    >
                        <Popup>
                            Rover Position<br />
                            Lat: {dronePosition[0]} <br />
                            Lon: {dronePosition[1]} <br />
                            Heading: {roverArrowHeading.toFixed(1)}°
                        </Popup>
                    </Marker>
                    {/* Drone trajectory */}
                    {!hidePolylineTemporarily && <Polyline positions={droneTrajectory} color="red" />}
                    {/* Rover trajectory */}
                    {!hidePolylineTemporarily && <Polyline positions={roverTrajectory} color="blue" />}
                </MapContainer>
                <TrackingButton isTracking={isTracking} toggleTracking={toggleTracking} />
            </div>
        </div>
    );
};

export default Map;