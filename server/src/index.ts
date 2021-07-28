import {createServer} from "http";
// import {Server, Socket} from "socket.io";
import mongoose from 'mongoose';
import {Note} from '../Note';
import WebSocket from 'ws';
// Create server with socket
const httpServer = createServer();
const port = 5000;
// const io = new Server(httpServer, {
//     cors: {
//         // TODO: check if 0.0.0.0 ip address works
//         origin: 'http://172.20.10.5:5000',
//         methods: ["GET", "POST"]
//     }
// });

// Connect to MongoDB container
// const mongoURI = 'mongodb://0 0.0.0.0:27017/notes';
// try {
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//     });
// } catch (error) {
//     console.error(`Was not able to connect to mongoDB and got error:${error}`)
// }
const wss = new WebSocket.Server({port}, () => console.log(`Server is up on port:${port}`));

wss.on('connection', function connection(ws) {
    ws.on('receive-note', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
                console.log('data', data);
            }
        });
    });
});
// Logic to handle connection and interaction with server

// io.on("connection", (socket: Socket) => {
//     console.log('connected');
//
//     socket.on('get-note', async noteId => {
//         const note = await findOrCreateNote(noteId)
//         // socket.join(documentId)
//         socket.emit('load-note', note)
//
//         socket.on('send-note', note => {
//             socket.broadcast.emit('received note', note)
//             //    TODO: save note and update notes
//         });
//
//         socket.on('save-note', async data => {
//             await Note.findByIdAndUpdate(noteId, {data})
//         })
//     })
//
//
//     // socket.on('update note', note =>{
//     //     console.log('update note');
//     // // TODO:   Update note and send update
//     // });
//
// });

const defaultValue = "";

async function findOrCreateNote(id: string | null) {
    if (id === null) return;

    const note = await Note.findById(id);
    if (note) return note;
    return Note.create({_id: id, data: defaultValue});
}

// httpServer.listen(port);