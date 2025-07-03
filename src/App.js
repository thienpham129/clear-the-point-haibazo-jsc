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
    <div className="flex flex-col justify-center items-start flex-grow w-full max-w-screen-md mx-auto px-6">
      <h3
        className={`text-3xl font-bold mb-4 ${gameOver ? 'text-red-600' : win ? 'text-green-600' : 'text-black'
          }`}
      >
        {gameOver ? 'GAME OVER' : win ? 'ALL CLEARED' : "LET'S PLAY"}
      </h3>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-lg w-20">Points:</label>
          <input
            type="text"
            min="1"
            max="10000"
            value={totalPoints}
            onChange={(e) => setTotalPoints(Number(e.target.value))}
            className="px-3 py-2 border-2 border-black rounded text-lg w-40 text-center"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-lg w-20">Time:</label>
          <span className="text-lg text-gray-700">{time.toFixed(1)}s</span>
        </div>
      </div>



      {
        !isStarted && (
          <>
            <button
              onClick={startGame}
              className="mt-1 px-4 py-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700"
            >
              Play
            </button>
          </>
        )
      }


      {isStarted && (
        <>
          <div className="mt-1 flex gap-2">
            <button
              onClick={startGame}
              className="mt-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-indigo-600"
            >
              Restart Game
            </button>
            {!win && !gameOver && (
              <button
                onClick={toggleAutoPlay}
                className={`mt-1 px-4 py-2 rounded text-white ${autoPlay ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Auto Play {autoPlay ? 'OFF' : 'ON'}
              </button>
            )}
          </div>

        </>
      )}
      <div className="flex items-start gap-2 mt-2">
        <GameBoard points={isStarted ? points : []} handleClick={handleClick} current={current} />
        {isStarted && current <= totalPoints && (
          <div className="mt-4 text-lg font-semibold text-gray-800">
            Next: <span className="text-indigo-600">{current}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
