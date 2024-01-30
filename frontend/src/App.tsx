import { useEffect, useState } from 'react';
import './App.css'
import { socket } from "./socket"
import UserCard from './components/UserCard';
import Cursor from './components/Cursor';

type User = {
	name: string,
	x: number,
	y: number,
	socketId: string,
}

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [users, setUsers] = useState<User[]>([]);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		console.log(users);
		console.log("curent socket : ", socket.id)
	}, [users]);

	useEffect(() => {
		handleMove();
	}, [cursorPosition])


	const trackCursorPosition = (e) => {
		// Update cursor position
		setCursorPosition({ x: e.pageX, y: e.pageY });
	};

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onRefresh(data: any) {
			const tempUsers = data.payload.filter((user: User) => user.socketId !== socket.id);
			setUsers([...tempUsers]);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('refresh', onRefresh);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off("refresh", onRefresh)
		};
	});

	const handleMove = () => {
		socket.emit('move', {
			x: cursorPosition.x,
			y: cursorPosition.y
		})
	}

	return (
		<div onMouseMove={trackCursorPosition} style={{ width: "100vw", height: "100vh" }}>
			<button onClick={handleMove}>MOVE</button>
			HELLO + {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
			{
				users?.map((user) =>
					<UserCard user={user} />
				)
			}
			{
				users?.map((user) =>
					<Cursor user={user} />
				)
			}

		</div>
	)
}

export default App
