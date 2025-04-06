import { create } from 'zustand';
import { UserInfo } from './useUserStore';

type ChatMessage = {
  from: 'me' | 'other';
  text: string;
  otherUserInfo: UserInfo | null; // 상대 유저 정보는 초기값을 null로 설정
};

type ChatStore = {
  currentUserId: string;
  currentRoomId: string;
  messages: ChatMessage[];
  otherUserInfo: UserInfo | null; // 상대 유저 정보 추가
  setUserId: (id: string) => void;
  setRoomId: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setOtherUserInfo: (userInfo: UserInfo) => void; // 상대 유저 정보 설정하는 함수
  clearMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  currentUserId: '',
  currentRoomId: '',
  messages: [],
  otherUserInfo: null, // 상대 유저 정보 초기화
  setUserId: (id) => set({ currentUserId: id }),
  setRoomId: (id) => set({ currentRoomId: id }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setOtherUserInfo: (userInfo: UserInfo) => set({ otherUserInfo: userInfo }), // 상대 유저 정보 설정
  clearMessages: () => set({ messages: [] }),
}));
