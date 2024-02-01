const express = require('express');
const { createServer } = require('http');
import { Socket, Server } from "socket.io";
import { RoomManager } from "./managers/RoomManager";

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	}
});

const roomManager = new RoomManager();

io.on('connection', (socket: Socket) => {
	console.log('a user connected');
	roomManager.addUser("randomName", socket);
	socket.on('disconnect', () => {
		roomManager.removeUser(socket);
		console.log('user disconnected');
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});