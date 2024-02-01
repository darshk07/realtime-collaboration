"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { createServer } = require('http');
const socket_io_1 = require("socket.io");
const RoomManager_1 = require("./managers/RoomManager");
const app = express();
const server = createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
const roomManager = new RoomManager_1.RoomManager();
io.on('connection', (socket) => {
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
