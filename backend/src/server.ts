import { ENV } from './config/env';
import app from './app';
import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const PORT = ENV.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Un client est connecté');
  socket.on('disconnect', () => {
    console.log('Un client est déconnecté');
  });
});

server.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});