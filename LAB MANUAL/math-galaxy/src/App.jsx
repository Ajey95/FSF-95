import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [inputVal, setInputVal] = useState('');
  const [asteroids, setAsteroids] = useState([]);
  const [flash, setFlash] = useState(false);

  // Refs for game loop logic to avoid stale state in intervals
  const asteroidsRef = useRef([]);
  const gameSpeedRef = useRef(2500);
  const spawnIntervalRef = useRef(null);
  const loopIntervalRef = useRef(null);
  const gameAreaRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setHealth(100);
    setAsteroids([]);
    asteroidsRef.current = [];
    gameSpeedRef.current = 2500;
    setGameState('playing');
    setInputVal('');

    // Game loop for movement (approx 60fps)
    loopIntervalRef.current = setInterval(updateGameLoop, 16);
    // Spawner
    spawnIntervalRef.current = setInterval(createAsteroid, gameSpeedRef.current);
  };

  const createAsteroid = () => {
    const operations = ['+', '-', '*', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, displayEquation;
    let typeClass = '';

    switch(op) {
        case '+':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            displayEquation = `${num1} + ${num2}`;
            typeClass = 'plus';
            break;
        case '-':
            num1 = Math.floor(Math.random() * 15) + 5; 
            num2 = Math.floor(Math.random() * num1);
            answer = num1 - num2;
            displayEquation = `${num1} - ${num2}`;
            typeClass = 'minus';
            break;
        case '*':
            num1 = Math.floor(Math.random() * 6) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 * num2;
            displayEquation = `${num1} × ${num2}`;
            typeClass = 'multi';
            break;
        case '/':
            answer = Math.floor(Math.random() * 5) + 2;
            num2 = Math.floor(Math.random() * 4) + 2;
            num1 = answer * num2;
            displayEquation = `${num1} ÷ ${num2}`;
            typeClass = 'divi';
            break;
        default: break;
    }

    const maxLeft = (gameAreaRef.current?.clientWidth || 600) - 110; 
    const newAsteroid = {
        id: Date.now() + Math.random(),
        type: typeClass,
        equation: displayEquation,
        answer: answer,
        left: Math.floor(Math.random() * maxLeft),
        top: -110
    };

    asteroidsRef.current.push(newAsteroid);
    setAsteroids([...asteroidsRef.current]);
  };

  const updateGameLoop = () => {
    if (!gameAreaRef.current) return;
    const gameHeight = gameAreaRef.current.clientHeight;

    // Move asteroids
    asteroidsRef.current.forEach(asteroid => {
      asteroid.top += 1.2;
    });

    // Check boundaries / cleanup
    const surviving = [];
    let damageTaken = 0;

    asteroidsRef.current.forEach(asteroid => {
      if (asteroid.top > (gameHeight - 120)) {
        damageTaken += 20;
      } else {
        surviving.push(asteroid);
      }
    });

    // If change occurred, update state
    if (damageTaken > 0 || surviving.length !== asteroidsRef.current.length) {
        asteroidsRef.current = surviving;
        setAsteroids([...asteroidsRef.current]);
        
        if (damageTaken > 0) {
            handleDamage(damageTaken);
        }
    } else {
        // Just force render for smooth movement
        setAsteroids([...asteroidsRef.current]);
    }
  };

  const handleDamage = (amount) => {
    setHealth(prev => {
        const newHealth = prev - amount;
        if (newHealth <= 0) endGame();
        return newHealth < 0 ? 0 : newHealth;
    });
    
    // Flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  const endGame = () => {
    clearInterval(loopIntervalRef.current);
    clearInterval(spawnIntervalRef.current);
    setGameState('gameover');
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
        if (!inputVal) return;
        
        const val = parseInt(inputVal);
        const matchIndex = asteroidsRef.current.findIndex(a => a.answer === val);

        if (matchIndex !== -1) {
            // Destroy asteroid
            asteroidsRef.current.splice(matchIndex, 1);
            setAsteroids([...asteroidsRef.current]);
            
            // Score Logic
            setScore(prev => {
                const newScore = prev + 10;
                // Speed up game every 50 points
                if (newScore % 50 === 0 && gameSpeedRef.current > 800) {
                    clearInterval(spawnIntervalRef.current);
                    gameSpeedRef.current -= 200;
                    spawnIntervalRef.current = setInterval(createAsteroid, gameSpeedRef.current);
                }
                return newScore;
            });
        } else {
            // Wrong answer visual feedback could go here
        }
        setInputVal('');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        clearInterval(loopIntervalRef.current);
        clearInterval(spawnIntervalRef.current);
    };
  }, []);

  return (
    <div className="game-container">
      {/* HUD */}
      <div className="hud-bar">
        <div className="hud-item score-box">Score: <span>{score}</span></div>
        <div className="hud-item health-box">Shields: <span>{health}</span>%</div>
      </div>

      {/* Game Area */}
      <div 
        className={`game-area ${flash ? 'flash-red' : ''}`} 
        ref={gameAreaRef}
      >
        {gameState === 'start' && (
          <div className="overlay">
            <h1 className="game-title">MATH GALAXY</h1>
            <p>Type the answer and hit ENTER to shoot the rocks!</p>
            <div className="instruction-box">
                <span><div className="legend-rock green"></div>Add</span>
                <span><div className="legend-rock red"></div>Subtract</span>
                <span><div className="legend-rock orange"></div>Multiply</span>
                <span><div className="legend-rock blue"></div>Divide</span>
            </div>
            <button className="game-btn" onClick={startGame}>LAUNCH MISSION</button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="overlay">
            <h1>MISSION FAILED!</h1>
            <p style={{ fontSize: '2rem' }}>Final Score: <span style={{color:'#f6b93b'}}>{score}</span></p>
            <button className="game-btn" onClick={startGame}>TRY AGAIN</button>
          </div>
        )}

        {/* Asteroids */}
        {asteroids.map(ast => (
          <div 
            key={ast.id} 
            className={`asteroid ${ast.type}`}
            style={{ left: ast.left, top: ast.top }}
          >
            {ast.equation}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="spaceship-container">
          <div className="spaceship-asset"></div>
        </div>
        <input 
          type="number" 
          className="game-input" 
          placeholder="?" 
          autoComplete="off"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleInput}
          autoFocus
        />
      </div>
    </div>
  );
};

export default App;