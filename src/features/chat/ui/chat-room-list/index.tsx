import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';
import { useGetChatRoomListQuery } from '@/entities';
import { useNavigate } from 'react-router';

export const ChatRoomList = () => {
  const navigate = useNavigate();
  const { data: chatRoomList } = useGetChatRoomListQuery();
  const { userInfo } = useUserStore();
  const {
    otherUserInfo,
    setOtherUserInfo,
    setRoomId,

    currentRoomId,
  } = useChatStore();

  const handleRoomClick = async (otherUser, roomId) => {
    setOtherUserInfo(otherUser);
    setRoomId(roomId);
    navigate(`/chat/${userInfo._id}/${roomId}`);
  };

  console.log(chatRoomList);

  return (
    <ul className="w-full flex flex-col gap-2">
      {chatRoomList.map(
        ({ otherUser: otherUserList, members, roomId, lastMessage }) => {
          const otherUser = otherUserList[0];

          if (!otherUser) setOtherUserInfo(otherUser);

          return (
            <li
              key={roomId}
              onClick={() => {
                handleRoomClick(otherUser, roomId);
              }}
              className={`flex items-center gap-3 px-2 py-3 hover:bg-gray-100 cursor-pointer border rounded-md
                  ${roomId === currentRoomId ? 'border-primary' : 'border-alt'}
                  `}
            >
              <div className="min-w-10 h-10 rounded-full bg-alt"></div>
              <div className="flex w-10/12  flex-col text-sm">
                <span className="">{otherUser?.displayName}</span>
                <span className="text-xs w-full h-4 text-ellipsis overflow-hidden text-gray-500">
                  {lastMessage ? lastMessage.content : '채팅을 시작해보세요.'}
                </span>
              </div>
            </li>
          );
        },
      )}
    </ul>
  );
};
