import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { io } from 'socket.io-client';

export const ChatPage: React.FC = () => {
  const { currentRoomId } = useChatStore();

  const { userInfo } = useUserStore();

  const currentUserId = userInfo._id;

  const navigate = useNavigate();

  const socketRef = React.useRef<any>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = React.useState<
    { from: 'me' | 'other'; text: string }[]
  >([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    if (currentRoomId) {
      socketRef.current.emit('joinRoom', currentRoomId);
    }

    socketRef.current.on(
      'receiveMessage',
      (data: { senderId: string; content: string }) => {
        const isMe = data.senderId?.trim() === currentUserId?.trim();

        setMessages((prev) => [
          ...prev,
          { from: isMe ? 'me' : 'other', text: data.content },
        ]);
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
      currentRoomId,
      senderId: currentUserId,
      content: input,
    });

    setInput('');
  };
  const chatRooms = [
    { name: '조훈로', roomId: 'room-123', userId: 'user-1' },
    { name: '이훈수', roomId: 'room-456', userId: 'user-2' },
    { name: '박보검', roomId: 'room-789', userId: 'user-3' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold">프모도로</h1>
        <button className="text-gray-600">로그인</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/3 border-r overflow-y-auto">
          <div className="p-4 border-b text-sm text-gray-500">채팅 요청</div>
          <ul>
            {chatRooms.map(({ name, roomId }) => (
              <li
                key={roomId}
                onClick={() => navigate(`/chat/${currentUserId}/${roomId}`)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">{name}</span>
                  <span className="text-xs text-gray-500">
                    즉시 프로젝트 가능하신가요?
                  </span>
                </div>
                <span className="ml-auto text-xs text-gray-400">11:55</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex flex-col w-2/3 h-full">
          <div className="flex flex-col flex-1 p-6 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) =>
              msg.from === 'me' ? (
                <div key={idx} className="self-end mb-2">
                  <div className="text-xs text-gray-500 mb-1">
                    {userInfo.displayName}
                  </div>

                  <div className="bg-red-200 rounded-xl px-4 py-2 text-sm max-w-xs">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 mb-1">상대방</div>
                    <div className="bg-gray-200 rounded-xl px-4 py-2 text-sm max-w-xs">
                      {msg.text}
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
      </div>

      <footer className="flex justify-between items-center text-xs text-gray-400 px-6 py-3 border-t">
        <p>개인정보 처리방침 | 이용약관</p>
        <button className="hover:underline">문제 신고</button>
      </footer>
    </div>
  );
};
