import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        // TODO: check if 0.0.0.0 ip address works
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket: Socket) => {
    console.log(`connected: ${socket.id}`);

    socket.on('disconnect',()=>{
        console.log(`Disconnected: ${socket.id}`)
    });

    socket.on('send-notes',notes =>{
        console.log(notes)
        socket.broadcast.emit('received-notes',notes)
    });
});

httpServer.listen(5000);

