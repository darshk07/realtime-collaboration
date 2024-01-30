import { Socket } from "socket.io";

export class UserManager {
	private xCoord: number;
	private yCoord: number;
	private socket: Socket;
	private name: string;

	constructor(name: string, socket: Socket, x = 0, y = 0) {
		this.name = name;
		this.socket = socket;
		this.xCoord = x;
		this.yCoord = y;
	}

	public getDetails() {
		return {
			name: this.name,
			socketId: this.socket.id,
			x: this.xCoord,
			y: this.yCoord
		}
	}

	public getCoord() {
		return [this.xCoord, this.yCoord];
	}

	public updateName(name: string) {
		this.name = name;
		return;
	}

	public handleMove(data: { x: number, y: number}) {
		this.xCoord = data.x;
		this.yCoord = data.y;
	}

	public getSocketId() {
		return this.socket.id;
	}

}
