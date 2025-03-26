// store/socketStore.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

type SocketStore = {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connect: () =>
    set({
      socket: io('http://localhost:3001'),
    }),
  disconnect: () => set({ socket: null }),
}));
