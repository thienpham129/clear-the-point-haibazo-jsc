export function PointButton({ id, x, y, onClick }) {
    return (
        //ui for point
        <button
            onClick={() => onClick(id)}
            className="absolute w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-lg hover:bg-blue-600 transition"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
        >
            {id}
        </button>
    )
}