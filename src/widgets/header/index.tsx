import { useUserStore } from '@/app/store/useUserStore';
import { ChatIcon } from '@/pages/HomePage';
import { PROJECT_NAME } from '@/shared/constants/core';
import { useNavigate } from 'react-router';

export const Header = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo } = useUserStore();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleChatClick = () => {
    navigate(`/chat/${userInfo._id}`);
  };

  return (
    <header className="w-screen flex justify-between items-cetner py-3 relative px-30 border-b">
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
            onClick={() => navigate(`/profile/${userInfo._id}`)}
            className="bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            {userInfo.displayName}
          </button>
        </article>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          로그인 / 회원가입
        </button>
      )}
    </header>
  );
};
