import { useChatStore } from '@/app/store/useChatStore';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import React from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { getIsMobile } from '@/shared/lib';
import { axios } from '@/app/config';
import { getChatRoomList, getMessageList, getUser } from '@/entities';

export type Message = {
  content: string;
};
//redeploy

export const ChatPage: React.FC = () => {
  const [curOtherName, setCurOtherName] = React.useState('');
  const { currentRoomId, setRoomId, setOtherUserInfo } = useChatStore();

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
        <div className="w-full flex gap-5 py-3 text-gray-500">
          <p>채팅</p>
          <p>채팅 요청</p>
        </div>
        <ul className="w-full flex flex-col gap-2">
          {chatRooms
            .slice() // 원본 변형 막기 (선택)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            ) // 최신순 정렬
            .map(
              ({ otherUser: otherUserList, members, roomId, lastMessage }) => {
                const otherUser = otherUserList[0];

                if (!otherUser) setCurOtherName(otherUser?.displayName);
                if (!otherUser) setOtherUserInfo(otherUser);

                return (
                  <li
                    key={roomId}
                    onClick={async () => {
                      setCurOtherName(otherUser?.displayName);
                      setOtherUserInfo(otherUser);
                      setRoomId(roomId);
                      navigate(`/chat/${currentUserId}/${roomId}`);
                    }}
                    className={`flex items-center gap-3 px-2 py-3 hover:bg-gray-100 cursor-pointer border rounded-md
          ${roomId === currentRoomId ? 'border-primary' : 'border-alt'}
          `}
                  >
                    <div className="min-w-10 h-10 rounded-full bg-alt"></div>
                    <div className="flex w-10/12 flex-col text-sm">
                      <span>{otherUser?.displayName}</span>
                      <span className="text-xs w-full h-4 text-ellipsis overflow-hidden text-gray-500">
                        {lastMessage
                          ? lastMessage.content
                          : '채팅을 시작해보세요.'}
                      </span>
                    </div>
                  </li>
                );
              },
            )}
        </ul>
      </aside>
      {!isMobile && (
        <section className="flex flex-col gap-5 min-w-9/12 h-[70vh] py-10">
          <div className="flex flex-col flex-1  p-6 overflow-y-auto border border-alt  rounded-md  shadow-md min-h-full">
            {messages?.map((msg, idx) =>
              msg.senderId === currentUserId ? (
                <div key={idx} className="self-end mb-2">
                  <div className="text-xs text-gray-500 mb-1">
                    {userInfo?.displayName}
                  </div>

                  <div className="bg-primary text-white rounded-md px-4 py-2 text-sm max-w-xs">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-alt"></div>
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 mb-1">
                      {curOtherName}
                    </div>
                    <div className="bg-primary-opacity rounded-md px-4 py-2 text-sm max-w-xs">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ),
            )}
            <div ref={bottomRef} />
          </div>

          <form
            className="flex gap-5 items-center rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="p-3 flex-1 w-full rounded-md border border-primary">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="입력하기"
                className=" focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-md p-3 bg-primary text-white"
            >
              전송
            </button>
          </form>
        </section>
      )}
      {isMobile && currentRoomId && (
        <React.Fragment>
          <section className="fixed top-0 left-0  bg-white z-10 flex flex-col gap-5 w-full h-[95vh] py-10">
            <div className="flex flex-col flex-1  p-6 overflow-y-auto border border-alt  rounded-md min-h-full">
              {messages?.map((msg, idx) =>
                msg.senderId === currentUserId ? (
                  <div key={idx} className="self-end mb-2">
                    <div className="text-xs text-gray-500 mb-1">
                      {userInfo?.displayName}
                    </div>

                    <div className="bg-primary text-white rounded-md px-4 py-2 text-sm max-w-xs">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-alt"></div>
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 mb-1">
                        {curOtherName}
                      </div>
                      <div className="bg-primary-opacity rounded-md px-4 py-2 text-sm max-w-xs">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ),
              )}
              <div ref={bottomRef} />
            </div>

            <form
              className="flex gap-5 items-center rounded-md px-4"
              onSubmit={handleSubmit}
            >
              <div className="p-3 flex-1 w-full rounded-md border border-primary">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="입력하기"
                  className=" focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-md p-3 bg-primary text-white"
              >
                전송
              </button>
            </form>
          </section>
        </React.Fragment>
      )}
    </main>
  );
};
