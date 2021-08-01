"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
exports.default = (http) => {
    const io = socket_io_1.default(http);
    io.on('connection', function (socket) {
        console.log('user is connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return io;
};
//# sourceMappingURL=socket.js.map