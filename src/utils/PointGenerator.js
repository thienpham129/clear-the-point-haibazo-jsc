export function getRandomPoints(n) {
    const points = [];

    // Set names used contains coordinates;
    const used = new Set();

    while (points.length < n) {
        // Random number 0 to 80 and 10 to 69
        // floor the value
        const x = +(Math.random() * 90 + 5).toFixed(1); // 5–95%
        const y = +(Math.random() * 90 + 5).toFixed(1); // 5–95%

        //string for key
        const key = `${x.toFixed(1)}-${y.toFixed(1)}`;

        // check
        if (!used.has(key)) {
            used.add(key);
            points.push({ id: points.length + 1, x, y });
        }
    }

    return points;
}