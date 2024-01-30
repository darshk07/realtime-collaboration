"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
const UserManager_1 = require("./UserManager");
class RoomManager {
    constructor() {
        this.users = new Map();
    }
    addUser(name, socket) {
        const user = new UserManager_1.UserManager(name, socket, 0, 0);
        this.users.set(user.getSocketId(), user);
        console.log("user added : ", this.users);
        this.initHandlers(socket);
    }
    removeUser(socket) {
        this.users.delete(socket.id);
        console.log("user removed : ", this.users);
    }
    broadcast(socket) {
        const payload = [];
        this.users.forEach((user) => {
            payload.push(user.getDetails());
        });
        socket.broadcast.emit("refresh", { payload });
        return;
    }
    initHandlers(socket) {
        socket.on('move', (data) => {
            const user = this.users.get(socket.id);
            user === null || user === void 0 ? void 0 : user.handleMove(data);
            this.broadcast(socket);
        });
        socket.on('update-name', (name) => {
            const user = this.users.get(socket.id);
            user === null || user === void 0 ? void 0 : user.updateName(name);
            this.broadcast(socket);
        });
    }
}
exports.RoomManager = RoomManager;
