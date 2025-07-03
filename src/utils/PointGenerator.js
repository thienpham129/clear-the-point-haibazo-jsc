export function getRandomPoints(n) {
    const points = [];

    // Set names used contains coordinates;
    const used = new Set();

    while(points.length < n){
        // Random number 0 to 80 and 10 to 69
        // floor the value
        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 60) + 10;

        // a string for key
        const key = `${x}-${y}`;

        // check
        if(!used.has(key)) {
            used.add(key);
            points.push({id: points.length + 1, x, y});
        }
    }

    return points;
}