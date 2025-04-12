import { axios } from '@/app/config';
import { useChatStore } from '@/app/store/useChatStore';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { UserCard } from '@/features/user/ui/user-card';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { useUserSearchQuery } from '@/shared/components/TabComponent';
import { UserSearchWidget } from '@/widgets/user-search-widget';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { setRoomId } = useChatStore();

  const { data: users, isLoading } = useUserSearchQuery();

  const handleChatClick = (user: UserInfo) => async () => {
    const userId = userInfo._id;

    try {
      const result = await axios.post('http://localhost:3000/chat/room', {
        userId: userId,
        otherUserId: user._id,
      });

      const roomId = result.data.roomId;

      setRoomId(roomId); // 상태 업데이트
      navigate(`/chat/${userId}/${roomId}`); // 채팅 페이지로 이동
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error); // 오류 발생 시 콘솔에 로그 출력
    }
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <main className="max-w-6xl mx-auto">
      <UserSearchWidget />
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 transition-all pb-20">
        {isLoading ? (
          <div className="flex">
            <PulseLoaderSpinner />
          </div>
        ) : (
          users?.map((cardUser: UserInfo) => (
            <UserCard key={cardUser._id} cardUser={cardUser} />
          ))
        )}
      </section>
    </main>
  );
};
