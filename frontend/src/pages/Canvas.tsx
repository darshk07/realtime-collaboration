import React, { useEffect, useRef, useState } from 'react';

interface GameProps {
	width: number;
	height: number;
}

const Game: React.FC<GameProps> = ({ width, height }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [player1MalletY, setPlayer1MalletY] = useState(100); // Initial y-position of player 1 mallet
	const [player2MalletY, setPlayer2MalletY] = useState(480); // Initial y-position of player 2 mallet

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');

		if (ctx) {
			// Draw game objects function
			const drawGame = () => {
				// Clear canvas
				ctx.clearRect(0, 0, canvas?.width, canvas?.height);
				ctx.fillStyle = '#2c3e50'; // Background color
				ctx.fillRect(0, 0, canvas?.width, canvas?.height);
				// Draw game objects
				// Draw mallets
				ctx.fillStyle = '#3498db'; // Player 1 mallet color
				ctx.fillRect(400, player1MalletY, 100, 20);

				ctx.fillStyle = '#e74c3c'; // Player 2 mallet color
				ctx.fillRect(400, player2MalletY, 100, 20);
			};

			// Event listener for keyboard input
			const handleKeyDown = (event: KeyboardEvent) => {
				// Update player mallet positions based on keyboard input
				if (event.key === 'ArrowUp') {
					setPlayer1MalletY((prevY) => Math.max(prevY - 10, 0));
				} else if (event.key === 'ArrowDown') {
					setPlayer1MalletY((prevY) => Math.min(prevY + 10, height - 20));
				} else if (event.key === 'w') {
					setPlayer2MalletY((prevY) => Math.max(prevY - 10, 0));
				} else if (event.key === 's') {
					setPlayer2MalletY((prevY) => Math.min(prevY + 10, height - 20));
				}
			};

			// Add event listener for keyboard input
			document.addEventListener('keydown', handleKeyDown);

			// Draw initial game state
			drawGame();

			// Clean up event listener
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [height, player1MalletY, player2MalletY]);

	return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Game;
