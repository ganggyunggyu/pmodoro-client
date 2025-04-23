import { useChatStore } from '@/app/store/useChatStore';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import React from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { getIsMobile } from '@/shared/lib';
import { getChatRoomList, getMessageList, getUser } from '@/entities';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared';
import { ChatMessage, ChatRoom } from '@/entities/chat/ui';

export type Message = {
  content: string;
};

export const ChatPage: React.FC = () => {
  const [curOtherName, setCurOtherName] = React.useState('');
  const { currentRoomId, setRoomId, setOtherUserInfo, otherUserInfo } =
    useChatStore();

  const queryClient = useQueryClient();

  const { userInfo, isAuth } = useUserStore();

  const currentUserId = userInfo?._id;

  const navigate = useNavigate();

  const socketRef = React.useRef<any>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const [input, setInput] = React.useState('');

  const {
    data: chatRooms,
    isLoading,
    refetch: chatRoomsFetch,
  } = useQuery({
    queryKey: ['chatRooms', currentUserId],
    queryFn: () => getChatRoomList(currentUserId),
    enabled: !!currentUserId,
  });

  const { data: messages = [], isSuccess: isMessages } = useQuery({
    queryKey: ['messages', currentRoomId],
    queryFn: () => getMessageList(currentRoomId),
    enabled: !!currentRoomId,
  });

  React.useEffect(() => {
    if (!currentRoomId) return;

    socketRef.current = io(import.meta.env.VITE_API_URL);

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
    chatRoomsFetch();
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

  const isMobile = getIsMobile();

  if (!isAuth) {
    return <div>로그인 필요</div>;
  }
  if (isLoading) {
    return <PulseLoaderSpinner />;
  }

  if (!chatRooms) {
    return <div>기존채팅방없음</div>;
  }

  return (
    <main className="flex w-full justify-center gap-5">
      <aside className="w-full lg:min-w-3/12 overflow-y-auto">
        <div className="w-full flex gap-5 py-3 px-3 text-gray-500">
          <p>채팅 목록</p>
        </div>
        <ul className="w-full flex flex-col gap-2 px-2">
          {chatRooms
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map(({ otherUser: otherUserList, roomId, lastMessage }) => {
              const otherUser = otherUserList[0];

              if (!otherUser) setOtherUserInfo(otherUser);

              return (
                <ChatRoom
                  key={roomId}
                  user={otherUser}
                  onClick={async () => {
                    setCurOtherName(otherUser?.displayName);
                    setOtherUserInfo(otherUser);
                    setRoomId(roomId);
                    navigate(`/chat/${currentUserId}/${roomId}`);
                  }}
                  lastMessage={
                    lastMessage ? lastMessage.content : '채팅을 시작해보세요.'
                  }
                  status="default"
                />
              );
            })}
        </ul>
      </aside>
      {!isMobile && (
        <section className="flex flex-col gap-5 min-w-9/12 h-[70vh] py-10">
          <div className="flex flex-col gap-5 p-6 overflow-y-auto border border-alt rounded-md shadow-md min-h-full">
            {messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.senderId === currentUserId
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <ChatMessage
                  message={msg.content}
                  isMe={msg.senderId === currentUserId}
                  displayName={
                    msg.senderId === currentUserId
                      ? undefined
                      : otherUserInfo?.displayName
                  }
                />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form
            className="flex gap-5 items-center rounded-md"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="입력하기"
              className="h-full"
            />
            <Button type="submit" className="h-full min-w-fit">
              전송
            </Button>
          </form>
        </section>
      )}
      {isMobile && currentRoomId && (
        <React.Fragment>
          <section className="fixed top-0 left-0  bg-white z-10 flex flex-col gap-5 w-full h-[95vh] py-10">
            <div className="flex flex-col flex-1 gap-3 p-6 overflow-y-auto border border-alt  rounded-md min-h-full">
              {messages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.senderId === currentUserId
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <ChatMessage
                    className="max-w-10/12"
                    message={msg.content}
                    isMe={msg.senderId === currentUserId}
                    displayName={
                      msg.senderId === currentUserId
                        ? undefined
                        : otherUserInfo?.displayName
                    }
                  />
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form
              className="flex gap-5 items-center rounded-md px-3"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="입력하기"
                className="h-full"
              />
              <Button type="submit" className="h-full min-w-fit">
                전송
              </Button>
            </form>
          </section>
        </React.Fragment>
      )}
    </main>
  );
};
