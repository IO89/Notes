import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';

import { Notes } from './types';

// Connect to MongoDB container
// const mongoURI = 'mongodb://0 0.0.0.0:27017/notes';
// try {
//   mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   });
// } catch (error) {
//   console.error(`Was not able to connect to mongoDB and got error: ${error}`)
// }

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    // TODO: check if 0.0.0.0 ip address works
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on('send-notes', (notes: Notes) => {
    socket.broadcast.emit('received-notes', notes);
  });
});

// async function findOrCreateNote(id: string | null) {
//   const defaultValue = "";
//   if (id === null) return;
//
//   try {
//     const note = await Note.findById(id);
//     if (note) return note;
//     return Note.create({ _id: id, data: defaultValue });
//   } catch (error) {
//     console.error(`Was not able to find or create note and got error:${error}`)
//   }
//
// }

httpServer.listen(5000);
