import { useUserStore } from '@/app/store/useUserStore';
import { PROJECT_NAME } from '@/shared/constants/core';
import { USER_LIST } from '@/shared/constants/dummy';
import { useNavigate } from 'react-router';
// import Logo from './shared/components/Logo';

export const HomePage = () => {
  const navitate = useNavigate();
  const { userInfo, isAuth } = useUserStore();

  const handleLogoClick = () => {
    navitate('/');
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
          <button
            onClick={() => navitate('/my-page')}
            className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            {userInfo.nickname}
          </button>
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
        {USER_LIST.map((user) => (
          <div key={user.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              <span className="font-semibold">{user.nickname}</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">{user.intro}</p>
            <div className="border-t border-gray-400 pt-2 text-sm">
              <p>📌 {user.position}</p>
              <p>📍 {user.location}</p>
            </div>
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
