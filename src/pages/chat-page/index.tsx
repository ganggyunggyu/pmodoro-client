import React from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';

import { ChatInput } from '@/features';
import {
  useGetChatRoomListQuery,
  useGetMessageQuery,
  socketService,
} from '@/entities';

import { getIsMobile } from '@/shared/lib';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { ChatRoomList } from '@/features/chat/ui/chat-room-list';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const {
    currentRoomId,
    otherUserInfo,
    setRoomId,
    setOtherUserInfo,
    setChatInputValue,
  } = useChatStore();
  const { userInfo, isAuth } = useUserStore();

  const currentUserId = userInfo?._id;

  const {
    data: chatRooms,
    isLoading,
    refetch: chatRoomsFetch,
  } = useGetChatRoomListQuery();

  const { data: messages } = useGetMessageQuery();

  React.useEffect(() => {
    if (!currentRoomId) {
      return;
    }
    if (currentRoomId) {
      // console.log(socketService.getSocket());
      // socketService.connect();

      socketService.emit('joinRoom', currentRoomId);

      socketService.on(
        'receiveMessage',
        (data: { senderId: string; content: string }) => {
          queryClient.setQueryData(['messages', currentRoomId], (old: any) => {
            if (!old) return [];
            return [...old, data];
          });
        },
      );
    }

    return () => {
      setChatInputValue('');
    };
  }, [currentRoomId]);

  React.useEffect(() => {
    chatRoomsFetch();
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  React.useEffect(() => {
    socketService.connect();
    return () => {
      socketService.disconnect();
    };
  }, []);

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
        <ChatRoomList />
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
                      {otherUserInfo?.displayName}
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

          <ChatInput />
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
                        {otherUserInfo?.displayName}
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

            <ChatInput />
          </section>
        </React.Fragment>
      )}
    </main>
  );
};
