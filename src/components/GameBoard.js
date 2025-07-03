import { PointButton } from "./PointButton";

export function GameBoard({ points, handleClick, current }) {
    return (
        // ui board game
        <div className="w-[600px] h-[400px] mt-8 bg-white border-2 border-black rounded shadow relative">
            {points.map((p) => (
                <PointButton key={p.id} id={p.id} x={p.x} y={p.y} onClick={handleClick} 
                fading={p.fading} fadeStartTime={p.fadeStartTime} highlighted={p.id === current}/>
            ))}
        </div>
    );
}