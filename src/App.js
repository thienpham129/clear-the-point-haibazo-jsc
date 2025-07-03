import { useEffect, useState } from 'react';
import './App.css';
import { getRandomPoints } from './utils/PointGenerator';
import { GameBoard } from './components/GameBoard';

function App() {
  const [totalPoints, setTotalPoints] = useState(5);
  const [points, setPoints] = useState([]);
  const [current, setCurrent] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [isStarted, setIsStated] = useState(false);
  const [time, setTime] = useState(0.0);
  const [intervalId, setIntervalId] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const startGame = () => {
    clearInterval(intervalId);

    setPoints(getRandomPoints(totalPoints));
    setCurrent(1);
    setGameOver(false);
    setWin(false);
    setTime(0);
    setIsStated(true);
    setAutoPlay(false);

    const id = setInterval(() => {
      setTime((prev) => +(prev + 0.1).toFixed(1));
    }, 100);
    setIntervalId(id);
  }

  useEffect(() => {
    setPoints(getRandomPoints(totalPoints));
  }, []);

  const handleClick = (id) => {
    if (gameOver || win) return;

    if (id === current) {
      // Mark as fading
      setPoints((prevPoints) =>
        prevPoints.map((p) => (p.id === id ? { ...p, fading: true, fadeStartTime: Date.now() } : p))
      );

      //Delay time
      setTimeout(() => {
        setPoints((prevPoints) => {
          const updated = prevPoints.filter((p) => p.id !== id);
          if (updated.length === 0) {
            clearInterval(intervalId);
            setWin(true);
          }
          return updated;
        });
      }, 3000);

      setCurrent((prev) => prev + 1);

    } else {
      setGameOver(true);
      clearInterval(intervalId);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  }

  useEffect(() => {
    if (!autoPlay || !isStarted || win || gameOver) return;

    const timer = setInterval(() => {
      const point = points.find((p) => p.id === current);
      if (point) handleClick(point.id);
    }, 500);

    return () => clearInterval(timer);
  }, [autoPlay, current, points, isStarted, win, gameOver]);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Clear The Point</h1>

      <GameBoard points={isStarted ? points : []} handleClick={handleClick} />
      <div className="flex items-center gap-2 mb-4">
        <label className="text-lg">Points:</label>
        <input
          type="text"
          min="1"
          max="5000"
          value={totalPoints}
          onChange={(e) => setTotalPoints(Number(e.target.value))}
          className="px-3 py-2 border rounded text-lg w-40 text-center"
        />
      </div>

      {
        !isStarted && (
          <>
            <div className="text-lg mb-2 text-gray-700">Time: {time.toFixed(1)}s</div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700"
            >
              Play
            </button>
          </>
        )
      }

      {isStarted && (
        <div className="text-lg mb-2 text-gray-700">Time: {time.toFixed(1)}s</div>
      )}


      {isStarted && (
        <>
          {gameOver && <div className="text-red-500 text-xl font-bold mb-2">Game Over</div>}
          {win && <div className="text-green-600 text-xl font-bold mb-2">ALL CLEARED</div>}

          <button
            onClick={startGame}
            className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Restart Game
          </button>
          <button
            onClick={toggleAutoPlay}
            className={`mt-2 px-4 py-2 rounded text-white ${autoPlay ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Auto Play {autoPlay ? 'OFF' : 'ON'}
          </button>
        </>
      )}

    </div>
  );
}

export default App;
