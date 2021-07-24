import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const port = 3000;
const io = new Server(httpServer, {
    // ...
});

io.on("connection", (socket: Socket) => {
    console.log('connected');
    socket.on('send note',note =>{
        console.log('received note',note)
        io.emit('send note',note)
    })
});

httpServer.listen(port);