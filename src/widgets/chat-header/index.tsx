import { useChatStore } from '@/app/store/useChatStore';
import { LeftArrow } from '@/shared/icons';

export const ChatHeader = () => {
  const { setRoomId, otherUserInfo } = useChatStore();
  const handleClearRoomClick = () => {
    setRoomId(null);
  };

  return (
    <header className="fixed  top-0 left-0 bg-white z-10 w-screen flex gap-6 items-cetner h-16 px-[5%] border-b border-primary-mute">
      <button onClick={handleClearRoomClick}>
        <LeftArrow />
      </button>
      <div className="flex flex-col   items-start justify-center">
        <p>{otherUserInfo?.position}</p>
        <p>{otherUserInfo?.displayName}</p>
      </div>
    </header>
  );
};
