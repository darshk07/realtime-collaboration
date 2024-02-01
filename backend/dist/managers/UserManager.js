"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
class UserManager {
    constructor(name, socket, x = 0, y = 0) {
        this.name = name;
        this.socket = socket;
        this.xCoord = x;
        this.yCoord = y;
    }
    getDetails() {
        return {
            name: this.name,
            socketId: this.socket.id,
            x: this.xCoord,
            y: this.yCoord
        };
    }
    getCoord() {
        return [this.xCoord, this.yCoord];
    }
    updateName(name) {
        this.name = name;
        return;
    }
    handleMove(data) {
        this.xCoord = data.x;
        this.yCoord = data.y;
    }
    getSocketId() {
        return this.socket.id;
    }
}
exports.UserManager = UserManager;
