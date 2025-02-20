import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Autoriser toutes les origines (à ajuster en production)
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Écouter les messages du client
  socket.on('chat message', (msg) => {
    console.log('message received:', msg);
    io.emit('chat message', msg); // Renvoyer le message à tous les clients
  });

  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});