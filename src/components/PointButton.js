import { useEffect, useState } from "react";

export function PointButton({ id, x, y, onClick, fading, fadeStartTime }) {
    const [countdown, setCountdown] = useState(3.0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!fading) return;

        //set opacity
        const visibilityTimeout = setTimeout(() => {
            setVisible(false);
        }, 50);

        const interval = setInterval(() => {
            const elapsed = (Date.now() - fadeStartTime) / 1000;
            const remaining = Math.max(0, 3 - elapsed);
            setCountdown(+remaining.toFixed(1));
        }, 100);

        return () => {
            clearInterval(interval);
            clearTimeout(visibilityTimeout);
        };
    }, [fading, fadeStartTime]);
    return (
        //ui for point
        <button
            onClick={() => onClick(id)}
            className={`absolute w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-lg 
            hover:bg-blue-600 transition-opacity duration-[4000ms] ease-out
            ${fading ? (visible ? 'opacity-100' : 'opacity-0') : 'opacity-100'}
            ${fading ? 'pointer-events-none' : ''}`}
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
        >
            <div className="text-lg">{id}</div>
            {fading && <div className="text-xs mt-1">{countdown.toFixed(1)}</div>}
        </button>
    );
}