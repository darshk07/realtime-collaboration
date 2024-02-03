import { io } from 'socket.io-client'

const url = 'http://172.16.150.10:3000'

export const socket = io(url);