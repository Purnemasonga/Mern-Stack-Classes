import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});

// Optional: listen to basic connection events here or inside components
socket.on('connect', () => {
  console.log('Connected to socket server', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});
