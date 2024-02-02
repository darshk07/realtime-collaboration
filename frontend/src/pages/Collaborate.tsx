import { MouseEvent, useEffect, useState } from 'react'
import { socket } from "../socket"
import UserCard from '../components/UserCard';
import Cursor from '../components/Cursor';

type User = {
	name: string,
	x: number,
	y: number,
	socketId: string,
}

const Collaborate = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [users, setUsers] = useState<User[]>([]);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		console.log(users);
		console.log("curent socket : ", socket.id)
	}, [users]);

	useEffect(() => {
		const handleMove = () => {
			socket.emit('move', {
				x: cursorPosition.x,
				y: cursorPosition.y
			})
		}
		handleMove();
	}, [cursorPosition])


	const trackCursorPosition = (e: MouseEvent) => {
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

		function onRefresh(data: { payload: User[] }) {
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



	return (
		<div onMouseMove={trackCursorPosition} style={{ width: "100vw", height: "100vh" }}>
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

export default Collaborate