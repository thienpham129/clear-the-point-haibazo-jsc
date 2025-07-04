import { useEffect, useState } from "react";

export function PointButton({ id, x, y, onClick, fading, fadeStartTime, highlighted }) {
    const [countdown, setCountdown] = useState(3.0);
    const [visible, setVisible] = useState(true);

    const baseClass = "absolute w-12 h-12 rounded-full font-bold text-black border-2 border-red-500 transition-opacity duration-[6000ms] ease-out";
    const hoverClass = "hover:bg-red-600";
    const opacityClass = fading ? (visible ? "opacity-100" : "opacity-0") : "opacity-100";
    const fadingClass = "pointer-events-none border-red-600 bg-red-800 text-white";
    const normalClass = "border-red-500 bg-white text-black";

    const finalClass = `${baseClass} ${hoverClass} ${opacityClass} ${fading ? fadingClass : normalClass}`;


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
            className={finalClass}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: fading || highlighted ? 50 : 1,
            }}
        >
            <div className="text-lg">{id}</div>
            {fading && <div className="text-xs -mt-2 text-white">{countdown.toFixed(1)}</div>}
        </button>
    );
}