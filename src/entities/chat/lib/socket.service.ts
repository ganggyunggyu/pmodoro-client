import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  private constructor() {}

  private static instance: SocketService;

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
      // console.log('새로운 소켓 객체 생성');
    }
    return SocketService.instance;
  }

  connect(): Socket {
    if (this.socket) {
      // console.log('소켓 이미 있음');
      return this.socket;
    }
    this.socket = io(import.meta.env.VITE_API_URL);

    this.socket.connect();

    // console.log('소켓 연결 완료');
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('소켓 연결 해제');
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  getSocket(): Socket {
    console.log(this.socket);
    return this.socket;
  }
}

export const socketService = SocketService.getInstance();
