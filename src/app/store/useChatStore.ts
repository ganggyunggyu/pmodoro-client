import { create } from 'zustand';

type ChatMessage = {
  from: 'me' | 'other';
  text: string;
};

type ChatStore = {
  currentUserId: string;
  currentRoomId: string;
  messages: ChatMessage[];
  setUserId: (id: string) => void;
  setRoomId: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  currentUserId: '',
  currentRoomId: '',
  messages: [],
  setUserId: (id) => set({ currentUserId: id }),
  setRoomId: (id) => set({ currentRoomId: id }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
