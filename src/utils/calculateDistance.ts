// Haversine formula to calculate distance between two points on the Earth's surface
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

// Function to calculate total horizontal distance
export function calculateTotalDistance(gpsData: { lat: number, lon: number }[]): number {
    let totalDistance = 0;

    for (let i = 1; i < gpsData.length; i++) {
        const { lat: lat1, lon: lon1 } = gpsData[i - 1];
        const { lat: lat2, lon: lon2 } = gpsData[i];
        const segmentDistance = calculateDistance(lat1, lon1, lat2, lon2);
        if (segmentDistance > 0) {
            totalDistance += segmentDistance;
        }
    }

    return totalDistance;
}

/*
// Example usage
const gpsData = [
    { lat: 40.712776, lon: -74.005974 },
    { lat: 40.713776, lon: -74.006974 },
    { lat: 40.714776, lon: -74.007974 },
    // Add more GPS data points
];

const totalDistance = calculateTotalDistance(gpsData);
console.log(`Total horizontal distance: ${totalDistance} meters`);
*/