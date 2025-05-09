import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';

import React from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { getIsMobile } from '@/shared/lib';
import { useGetChatRoomListQuery, useGetMessageQuery } from '@/entities';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared';
import { ChatMessage, ChatRoom } from '@/entities/chat/ui';

export const ChatPage: React.FC = () => {
  const { currentRoomId, setRoomId, setOtherUserInfo, otherUserInfo } =
    useChatStore();
  const { userInfo, isAuth } = useUserStore();
  const currentUserId = userInfo?._id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const socketRef = React.useRef<any>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const [input, setInput] = React.useState('');

  const {
    data: chatRooms = [],
    isLoading,
    refetch: chatRoomsFetch,
  } = useGetChatRoomListQuery();

  const { data: messageList } = useGetMessageQuery();

  React.useEffect(() => {
    if (!currentRoomId) return;

    socketRef.current = io(import.meta.env.VITE_API_URL);
    socketRef.current.emit('joinRoom', currentRoomId);

    socketRef.current.on(
      'receiveMessage',
      (data: { senderId: string; content: string }) => {
        queryClient.setQueryData(['messages', currentRoomId], (old: any) => {
          return old ? [...old, data] : [data];
        });
      },
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentRoomId]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView();
    return () => setRoomId(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentRoomId || !currentUserId) return;

    socketRef.current.emit('sendMessage', {
      roomId: currentRoomId,
      senderId: currentUserId,
      content: input,
    });

    setInput('');
  };

  const isMobile = getIsMobile();

  const sortedChatRoomListByCreatedAt = [...chatRooms].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const MessageWrapper = () => {
    return (
      <React.Fragment>
        {messageList?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <ChatMessage
              className="max-w-10/12"
              message={msg.content}
              isMe={msg.senderId === currentUserId}
              displayName={
                msg.senderId === currentUserId
                  ? null
                  : otherUserInfo?.displayName
              }
            />
          </div>
        ))}
        <div ref={bottomRef} />
      </React.Fragment>
    );
  };

  const ChatForm = () => {
    return (
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
    );
  };

  const ChatRomeList = () => {
    return (
      <ul className="w-full flex flex-col gap-2 px-2">
        {isLoading ? (
          <PulseLoaderSpinner />
        ) : (
          sortedChatRoomListByCreatedAt.map(
            ({ otherUser: list, roomId, lastMessage }) => {
              const otherUser = list?.[0];
              if (!otherUser) return null;

              return (
                <ChatRoom
                  key={roomId}
                  user={otherUser}
                  onClick={() => {
                    setOtherUserInfo(otherUser);
                    setRoomId(roomId);
                    if (currentUserId && roomId) {
                      navigate(`/chat/${currentUserId}/${roomId}`);
                    }
                  }}
                  lastMessage={lastMessage?.content ?? '채팅을 시작해보세요.'}
                  status={currentRoomId === roomId ? 'default' : 'read'}
                />
              );
            },
          )
        )}
      </ul>
    );
  };

  if (!isAuth) {
    return <div>로그인 필요</div>;
  }

  return (
    <main className="flex w-full justify-center gap-5">
      <aside className="w-full lg:min-w-3/12 overflow-y-auto">
        <div className="w-full flex gap-5 py-3 px-3 text-gray-500">
          <p>채팅 목록</p>
        </div>
        <ChatRomeList />
      </aside>

      {!isMobile && (
        <section className="flex flex-col gap-5 min-w-9/12 h-[70vh] py-10">
          <article className="flex flex-col gap-5 p-6 overflow-y-auto border border-alt rounded-md shadow-md min-h-full">
            {!currentRoomId ? (
              <p className="text-headline-sb">
                <span className="text-2xl">👈</span> 좌측의 채팅방을 눌러서
                채팅을 시작해보세요.
              </p>
            ) : (
              <MessageWrapper />
            )}
          </article>
          {currentRoomId && (
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
          )}
        </section>
      )}

      {isMobile && currentRoomId && (
        <section className="fixed top-0 left-0 bg-white z-10 flex flex-col gap-5 w-full h-[95vh] py-10">
          <div className="flex flex-col flex-1 gap-3 p-6 overflow-y-auto border border-alt rounded-md min-h-full">
            <MessageWrapper />
            {currentRoomId && (
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
            )}
          </div>
        </section>
      )}
    </main>
  );
};
