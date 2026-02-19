import React, { useState, useEffect } from 'react';

function App() {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [playerPosition, setPlayerPosition] = useState(50);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (!gameOver) {
                setScore(prev => prev + 1);
                moveObstacles();
                checkCollision();
            }
        }, 100);

        return () => clearInterval(gameLoop);
    }, [gameOver, obstacles, playerPosition]);

    const moveObstacles = () => {
        setObstacles(prev => {
            const newObstacles = [...prev];
            newObstacles.forEach(obstacle => {
                obstacle.x -= 5;
            });

            if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < 300) {
                newObstacles.push({
                    x: 400,
                    y: Math.floor(Math.random() * 80) + 10
                });
            }

            return newObstacles.filter(obstacle => obstacle.x > -20);
        });
    };

    const checkCollision = () => {
        obstacles.forEach(obstacle => {
            if (
                playerPosition > obstacle.y - 20 &&
                playerPosition < obstacle.y + 20 &&
                obstacle.x < 50 &&
                obstacle.x > 30
            ) {
                setGameOver(true);
            }
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowUp' && playerPosition > 10) {
            setPlayerPosition(prev => prev - 10);
        } else if (e.key === 'ArrowDown' && playerPosition < 90) {
            setPlayerPosition(prev => prev + 10);
        }
    };

    const resetGame = () => {
        setScore(0);
        setGameOver(false);
        setObstacles([]);
        setPlayerPosition(50);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div style={{ width: '400px', height: '200px', border: '1px solid black', position: 'relative' }}>
            {!gameOver ? (
                <>
                    <div style={{ position: 'absolute', left: '40px', top: `${playerPosition}%`, width: '20px', height: '20px', backgroundColor: 'blue' }}></div>
                    {obstacles.map((obstacle, index) => (
                        <div key={index} style={{ position: 'absolute', left: `${obstacle.x}px`, top: `${obstacle.y}%`, width: '20px', height: '20px', backgroundColor: 'red' }}></div>
                    ))}
                    <div>Score: {score}</div>
                </>
            ) : (
                <div>
                    <div>Game Over! Score: {score}</div>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
}

export default App;