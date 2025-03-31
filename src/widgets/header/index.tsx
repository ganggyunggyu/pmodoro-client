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
    <header className="fixed  top-0 left-0 bg-white z-10 w-screen flex justify-between items-cetner h-16 px-30 border-b border-primary-mute">
      <button
        onClick={handleLogoClick}
        type="button"
        className="text-2xl font-bold text-primary logo-font"
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
        <article className="flex items-center gap-5">
          <button onClick={() => navigate('/login')} className="h-8/12 text-xs">
            공지사항
          </button>
          <button onClick={() => navigate('/login')} className="h-8/12 text-xs">
            로그인
          </button>
        </article>
      )}
    </header>
  );
};
