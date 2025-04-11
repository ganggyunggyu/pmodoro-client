import { axios } from '@/app/config';
import { ChatRoom, Message } from '../model';

export const getMessageList = async (roomId: string): Promise<Message[]> => {
  const res = await axios.get(`/chat/messages?roomId=${roomId}`);
  return res.data;
};
export const getChatRoomList = async (userId: string): Promise<ChatRoom[]> => {
  const res = await axios.get(`/chat/rooms?userId=${userId}`);

  return res.data;
};
