"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = http_1.createServer();
const port = 3000;
const io = new socket_io_1.Server(httpServer, {
// ...
});
io.on("connection", (socket) => {
    console.log('connected');
    socket.on('send note', note => {
        console.log('received note', note);
        io.emit('send note', note);
    });
});
httpServer.listen(port);
