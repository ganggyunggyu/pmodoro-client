import { useChatStore } from '@/app/store/useChatStore';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

export type ChatRoom = {
  roomId: string;
  members: string[];
  otherUser: UserInfo;
};

export const fetchMessages = async (roomId: string) => {
  const res = await axios.get(
    `http://localhost:3000/chat/messages?roomId=${roomId}`,
  );
  return res.data;
};
export const fetchChatRooms = async (userId: string): Promise<ChatRoom[]> => {
  const res = await axios.get(
    `http://localhost:3000/chat/rooms?userId=${userId}`,
  );

  return res.data;
};

export const ChatPage: React.FC = () => {
  const [curOtherName, setCurOtherName] = React.useState('');
  const { currentRoomId, setRoomId } = useChatStore();

  const queryClient = useQueryClient();

  const { userInfo } = useUserStore();

  const currentUserId = userInfo._id;

  const navigate = useNavigate();

  const socketRef = React.useRef<any>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const [input, setInput] = React.useState('');

  const {
    data: chatRooms,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['chatRooms', currentUserId],
    queryFn: () => fetchChatRooms(currentUserId),
    enabled: !!currentUserId,
  });

  const { data: messages = [], isSuccess: isMessages } = useQuery({
    queryKey: ['messages', currentRoomId],
    queryFn: () => fetchMessages(currentRoomId),
    enabled: !!currentRoomId,
  });

  React.useEffect(() => {
    if (!currentRoomId) return;

    socketRef.current = io('http://localhost:3001');

    socketRef.current.emit('joinRoom', currentRoomId);

    socketRef.current.on(
      'receiveMessage',
      (data: { senderId: string; content: string }) => {
        queryClient.setQueryData(['messages', currentRoomId], (old: any) => {
          if (!old) return [];
          return [...old, data];
        });
      },
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentRoomId]);
  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    socketRef.current.emit('sendMessage', {
      roomId: currentRoomId,
      senderId: currentUserId,
      content: input,
    });

    setInput('');
  };

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (chatRooms.length === 0) {
    return <div>기존채팅방없음</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/3 border-r overflow-y-auto">
          <div className="p-4 border-b text-sm text-gray-500">채팅 요청</div>
          <ul>
            {chatRooms.map(({ otherUser, roomId }) => (
              <li
                key={roomId}
                onClick={() => {
                  setCurOtherName(otherUser.displayName);

                  setRoomId(roomId);
                  navigate(`/chat/${currentUserId}/${roomId}`);
                }}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b
                  ${
                    roomId === currentRoomId
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  }
                  `}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">{otherUser.displayName}</span>
                  <span className="text-xs text-gray-500">
                    즉시 프로젝트 가능하신가요?
                  </span>
                </div>
                <span className="ml-auto text-xs text-gray-400">11:55</span>
              </li>
            ))}
          </ul>
        </aside>

        {currentRoomId && isMessages && (
          <section className="flex flex-col w-10/12 h-full">
            <div className="flex flex-col flex-1 p-6 overflow-y-auto bg-gray-50 min-h-full">
              {messages?.map((msg, idx) =>
                msg.senderId === currentUserId ? (
                  <div key={idx} className="self-end mb-2">
                    <div className="text-xs text-gray-500 mb-1">
                      {userInfo.displayName}
                    </div>

                    <div className="bg-red-200 rounded-xl px-4 py-2 text-sm max-w-xs">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 mb-1">
                        {curOtherName}
                      </div>
                      <div className="bg-gray-200 rounded-xl px-4 py-2 text-sm max-w-xs">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ),
              )}
              <div ref={bottomRef} />
            </div>

            <form
              className="flex items-center border-t p-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력해보세요."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring"
              />
              <button
                type="submit"
                className="ml-4 text-xl text-main hover:scale-110"
              >
                ➤
              </button>
            </form>
          </section>
        )}
      </div>

      <footer className="flex justify-between items-center text-xs text-gray-400 px-6 py-3 border-t">
        <p>개인정보 처리방침 | 이용약관</p>
        <button className="hover:underline">문제 신고</button>
      </footer>
    </div>
  );
};
