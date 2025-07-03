import { PointButton } from "./PointButton";

export function GameBoard({ points, handleClick }) {
    return (
        // ui board game
        <div className="w-[600px] h-[400px] bg-white border rounded shadow relative">
            {points.map((p) => (
                <PointButton key={p.id} id={p.id} x={p.x} y={p.y} onClick={handleClick} />
            ))}
        </div>
    );
}