import { useChatStore } from '@/app/store/useChatStore';
import { useUserStore } from '@/app/store/useUserStore';
import { PROJECT_NAME } from '@/shared/constants/core';
import { mockUsers } from '@/shared/constants/dummy';
import axios from 'axios';
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
  const navitate = useNavigate();
  const { userInfo, isAuth } = useUserStore();
  const { setRoomId, currentRoomId } = useChatStore();

  const handleLogoClick = () => {
    navitate('/');
  };

  const handleChatClick = () => {
    navitate(`/chat/${userInfo._id}`);
    console.log(userInfo);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleLogoClick}
          type="button"
          className="text-2xl font-bold text-red-500"
        >
          {PROJECT_NAME}
        </button>

        {isAuth ? (
          <article className="flex items-center gap-5">
            <button onClick={handleChatClick}>
              <ChatIcon />
            </button>
            <button
              onClick={() => navitate('/my-page')}
              className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {userInfo.displayName}
            </button>
          </article>
        ) : (
          <button
            onClick={() => navitate('/login')}
            className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            로그인 / 회원가입
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <select className="px-4 py-2 border rounded-lg">
          <option>포지션</option>
          <option>프론트엔드</option>
          <option>백엔드</option>
          <option>디자이너</option>
        </select>
        <select className="px-4 py-2 border rounded-lg">
          <option>기술 스택</option>
          <option>React</option>
          <option>Node.js</option>
          <option>Figma</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {mockUsers.map((user) => (
          <div key={user._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              <span className="font-semibold">{user.displayName}</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">{user.displayName}</p>
            <div className="border-t border-gray-400 pt-2 text-sm">
              <p>📌 {user.position}</p>
              <p>
                📍 {user.firstArea} {user.secondArea}
              </p>
            </div>
            <button
              onClick={async () => {
                const userId = userInfo._id;

                const result = await axios.post(
                  'http://localhost:3000/chat/room',
                  {
                    userId: userId,
                    otherUserId: user._id,
                  },
                );

                const roomId = result.data;

                setRoomId(roomId);

                navitate(`/chat/${userId}/${roomId}`);
              }}
            >
              채팅하기
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-gray-600 text-sm flex justify-center gap-6">
        <button className="hover:underline">이용약관</button>
        <button className="hover:underline">개인정보처리방침</button>
      </div>
    </div>
  );
};
