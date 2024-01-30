import { Socket } from "socket.io";
import { UserManager } from "./UserManager";

export class RoomManager {
	private users: Map<string, UserManager>;

	constructor() {
		this.users = new Map<string, UserManager>();
	}

	addUser(name: string, socket: Socket) {
		const user = new UserManager(name, socket, 0, 0);
		this.users.set(user.getSocketId(), user);
		this.initHandlers(socket);
	}

	removeUser(socket: Socket) {
		this.users.delete(socket.id);
	}

	broadcast(socket: Socket) {
		const payload: any = [];
		this.users.forEach((user) => {
			payload.push(user.getDetails())
		})
		socket.broadcast.emit("refresh", { payload })
		return;
	}

	initHandlers(socket: Socket) {
		socket.on('move', (data: {
			x: number,
			y: number,
		}) => {
			const user = this.users.get(socket.id);
			user?.handleMove(data);
			this.broadcast(socket);
		});

		socket.on('update-name', (name: string) => {
			const user = this.users.get(socket.id);
			user?.updateName(name);
			this.broadcast(socket);
		})
	}

}
