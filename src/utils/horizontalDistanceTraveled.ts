function haversineDistance(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371e3; // world radius
    const toRadians = (deg: number) => deg * (Math.PI / 180);

    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const deltaPhi = toRadians(lat2 - lat1);
    const deltaLambda = toRadians(lon2 - lon1);

    const a = Math.sin(deltaPhi / 2) ** 2 +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // meters
}

export function horizontalDistanceTraveled(positions: [number, number][]): number {
    let total = 0;
    for (let i = 1; i < positions.length; i++) {
        total += haversineDistance(positions[i - 1], positions[i]);
    }
    return total; // meters
}
