import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';

import { socketService } from '@/entities';

export const ChatInput = () => {
  const { chatInputValue, setChatInputValue, currentRoomId } = useChatStore();
  const { userInfo } = useUserStore();

  const currentUserId = userInfo._id;
  const socket = socketService.connect();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputValue.trim()) return;

    socket.emit('sendMessage', {
      roomId: currentRoomId,
      senderId: currentUserId,
      content: chatInputValue,
    });

    setChatInputValue('');
  };
  return (
    <form
      className="flex gap-5 items-center rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="p-3 flex-1 w-full rounded-md border border-primary">
        <input
          type="text"
          value={chatInputValue}
          onChange={(e) => setChatInputValue(e.target.value)}
          placeholder="입력하기"
          className=" focus:outline-none"
        />
      </div>
      <button type="submit" className="rounded-md p-3 bg-primary text-white">
        전송
      </button>
    </form>
  );
};
