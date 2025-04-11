import { useChatStore } from '@/app/store/useChatStore';
import { useQuery } from '@tanstack/react-query';
import { getChatRoomList, getMessageList } from '../api';
import { useUserStore } from '@/app/store/useUserStore';

export const useGetMessageQuery = () => {
  const { currentRoomId } = useChatStore();
  return useQuery({
    queryKey: ['messages', currentRoomId],
    queryFn: () => getMessageList(currentRoomId),
    enabled: !!currentRoomId,
  });
};

export const useGetChatRoomListQuery = () => {
  const { userInfo } = useUserStore();

  const currentUserId = userInfo?._id;
  return useQuery({
    queryKey: ['chatRooms', currentUserId],
    queryFn: () => getChatRoomList(currentUserId),
    enabled: !!currentUserId,
  });
};
