import { axios } from '@/app/config';
import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';
import { useNavigate } from 'react-router';

export const UserCard = ({ cardUser }) => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { setRoomId } = useChatStore();

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleChatClick = async () => {
    const isMe = userInfo._id === cardUser._id;
    if (isMe) {
      navigate(`chat/${userInfo._id}`);
    } else {
      try {
        const result = await axios.post('/chat/room', {
          userId: userInfo._id,
          otherUserId: cardUser._id,
        });

        const roomId = result.data.roomId;

        setRoomId(roomId); // 상태 업데이트
        navigate(`/chat/${userInfo._id}/${roomId}`); // 채팅 페이지로 이동
      } catch (error) {
        console.error('채팅방 생성 중 오류 발생:', error); // 오류 발생 시 콘솔에 로그 출력
      }
    }
  };
  return (
    <article
      key={cardUser._id}
      className="relative flex flex-col justify-between gap-3 p-3 rounded-lg border border-alt min-w-11/12 lg:min-w-70 bg-gray-l

      hover:shadow-lg hover:scale-105 transition-all
      "
    >
      <div className="flex gap-3">
        {cardUser.kakaoAuthInfo ? (
          <img
            className="w-12 h-12 rounded-full"
            src={cardUser.kakaoAuthInfo.profileImg}
            alt=""
          />
        ) : (
          <div className="w-12 h-12 bg-alt rounded-full"></div>
        )}
        <div className="flex flex-col justify-center">
          <span className="flex-1 font-semibold text-sm mt-2">
            {cardUser.displayName}
          </span>
          <span className="text-sm text-black-alt">{cardUser.position}</span>
        </div>
        <div className="flex-1 relative">
          <p className="w-full text-right text-black-alt absolute -bottom-1 text-xs">
            {cardUser?.firstArea} {cardUser?.secondArea}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-pretty text-sm">{cardUser.description}</p>
        <div className="flex gap-3 w-full overflow-y-scroll">
          {cardUser.skills?.map((pos, index) => {
            return (
              <figure
                key={index}
                className="min-w-fit px-3 py-2 border border-alt rounded-full text-xs"
              >
                {pos}
              </figure>
            );
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-5">
        <button
          className="w-full flex items-center justify-center border py-1 rounded-md border-alt cursor-pointer hover:bg-black-alt"
          onClick={() => handleProfileClick(cardUser._id)}
        >
          프로필 보기
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center py-1 rounded-md border border-primary text-primary cursor-pointer"
          onClick={handleChatClick}
        >
          채팅하기
        </button>
      </div>
    </article>
  );
};
