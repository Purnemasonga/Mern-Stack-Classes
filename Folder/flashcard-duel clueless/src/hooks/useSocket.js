import { useEffect, useRef, useCallback } from 'react';
import { getSocket, disconnectSocket } from '../services/socket';

export function useSocket(roomCode, handlers = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!roomCode) return;

    const socket = getSocket();
    socketRef.current = socket;

    socket.emit('join_room', { roomCode });

    Object.entries(handlers).forEach(([event, fn]) => {
      socket.on(event, fn);
    });

    return () => {
      Object.entries(handlers).forEach(([event, fn]) => {
        socket.off(event, fn);
      });
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomCode]);

  const emit = useCallback((event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return { emit };
}