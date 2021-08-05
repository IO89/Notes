import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';

import { NoteData, Notes } from './types';
import { Note } from './models/Note';

/* Connect to MongoDB container */
const mongoURI = 'mongodb://0 0.0.0.0:27017/notes';

try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
} catch (error) {
  console.error(`Was not able to connect to mongoDB and got error: ${error}`);
}

/* Create http server with web sockets */
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    // TODO: check if 0.0.0.0 ip address works
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST']
  }
});

io.on('connection', async (socket: Socket) => {
  console.log(`connected: ${socket.id}`);

  // const notes = await Note.find();
  // socket.emit('server:send-all-notes', notes);

  socket.on('update-notes', (notes: Notes) => {
    socket.broadcast.emit('received-notes', notes);
  });

  socket.on('send-note', async (data) => {
    const note = new Note(JSON.parse(data));
    await note.save();
    socket.broadcast.emit('new-note', note);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

httpServer.listen(5000);
