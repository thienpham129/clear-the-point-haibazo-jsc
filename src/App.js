import { useEffect, useState } from 'react';
import './App.css';
import { getRandomPoints } from './utils/PointGenerator';
import { GameBoard } from './components/GameBoard';

function App() {
  const totalPoints = 5;
  const [points, setPoints] = useState([]);
  const [current, setCurrent] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setPoints(getRandomPoints(totalPoints));
  }, []);

  const handleClick = (id) => {
    if (gameOver || win) return;

    if (id === current) {
      const updatedPoints = points.filter((p) => p.id !== id);
      setPoints(updatedPoints);

      if (current === totalPoints) {
        setWin(true);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPoints(getRandomPoints(totalPoints));
    setCurrent(1);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🎯 Clear The Point</h1>

      {gameOver && <div className="text-red-500 text-xl font-bold mb-2">Game Over</div>}
      {win && <div className="text-green-600 text-xl font-bold mb-2">You Win! 🎉</div>}

      <GameBoard points={points} handleClick={handleClick} />

      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
