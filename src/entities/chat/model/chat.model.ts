import { UserInfo } from '@/app/store/useUserStore';

export type Message = {
  content: string;
  senderId: string;
};
export type ChatRoom = {
  roomId: string;
  members: string[];
  otherUser: UserInfo;
  lastMessage: Message;
  createdAt: string;
};
