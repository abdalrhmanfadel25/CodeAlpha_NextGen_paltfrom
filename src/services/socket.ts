// src/services/socket.js
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  constructor() {
    this.socket = null;
  }

  connect(userId: string) {
    this.socket = io(SOCKET_URL);
    this.socket.emit('join-room', userId);
  }

  sendMessage(data: any) {
    if (this.socket) {
      this.socket.emit('send-message', data);
    }
  }

  onMessage(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('receive-message', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();

