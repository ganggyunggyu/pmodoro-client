import { axios } from '@/app/config';
import { useChatStore } from '@/app/store/useChatStore';
import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { UserSearchForm } from '@/features/user';
import { UserSearchWidget } from '@/widgets/user-search-widget';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { setRoomId } = useChatStore();

  const getUsers = async () => {
    return await axios.get('/users');
  };

  const userUsersQuery = () => {
    return useQuery({
      queryKey: ['user-list'],
      queryFn: getUsers,
    });
  };
  axios;
  const { data: users, isLoading } = userUsersQuery();

  const handleChatClick = (user: UserInfo) => async () => {
    console.log('click'); // 버튼 클릭 확인을 위해 로그 찍어보기

    const userId = userInfo.userId;

    try {
      const result = await axios.post('http://localhost:3000/chat/room', {
        userId: userId,
        otherUserId: user.userId,
      });

      const roomId = result.data.roomId;
      console.log('채팅방 생성 성공, roomId:', roomId); // roomId 로그로 확인

      setRoomId(roomId); // 상태 업데이트
      navigate(`/chat/${userId}/${roomId}`); // 채팅 페이지로 이동
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error); // 오류 발생 시 콘솔에 로그 출력
    }
  };

  const handleProfileClick = (user) => {
    navigate(`/profile/${user._id}`);
  };

  if (isLoading) {
    return <div>유저 불러오는중</div>;
  }
  return (
    <main className="p-6 max-w-6xl mx-auto w-10/12">
      <UserSearchWidget />
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 transition-all">
        {users.data?.map((user: UserInfo) => (
          <article
            key={user._id}
            className="flex flex-col gap-3 p-3 rounded-lg border border-neutral-300"
          >
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-alt rounded-full"></div>
              <div className="flex flex-col justify-center">
                <span className="flex-1 text-sm">{user.displayName}</span>
                <span className="text-xs">{user.job}</span>
              </div>
              <div className="flex-1 relative">
                <p className="w-full text-right absolute bottom-0 text-xs">
                  {user.firstArea} {user.secondArea}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-balance overflow-hidden">{user.userId}</p>
              <div className="flex gap-3 w-full overflow-y-scroll">
                {user.detailPositionList?.map((pos, index) => {
                  return (
                    <figure
                      key={index}
                      className=" min-w-fit px-3 py-2 border border-alt rounded-full text-xs"
                    >
                      {pos}
                    </figure>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-5">
              <button
                className="w-full flex items-center justify-center border py-1 rounded-md border-alt"
                onClick={() => handleProfileClick(user)}
              >
                프로필 보기
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center py-1 rounded-md border border-primary text-primary cursor-pointer"
                // onClick={() => handleChatClick(user)}
                onClick={async () => {
                  const isMe = userInfo._id === user._id;
                  if (isMe) {
                    navigate(`chat/${userInfo._id}`);
                  } else {
                    console.log('click'); // 버튼 클릭 확인을 위해 로그 찍어보기

                    const userId = userInfo._id;

                    try {
                      const result = await axios.post(
                        'http://localhost:3000/chat/room',
                        {
                          userId: userId,
                          otherUserId: user._id,
                        },
                      );

                      const roomId = result.data.roomId;
                      console.log('채팅방 생성 성공, roomId:', roomId); // roomId 로그로 확인

                      setRoomId(roomId); // 상태 업데이트
                      navigate(`/chat/${userId}/${roomId}`); // 채팅 페이지로 이동
                    } catch (error) {
                      console.error('채팅방 생성 중 오류 발생:', error); // 오류 발생 시 콘솔에 로그 출력
                    }
                  }
                }}
              >
                채팅하기
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-10 text-center text-gray-600 text-sm flex justify-center gap-6">
        <button className="hover:underline">이용약관</button>
        <button className="hover:underline">개인정보처리방침</button>
      </div>
    </main>
  );
};
