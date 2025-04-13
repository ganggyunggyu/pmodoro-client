import { useWidgetStore } from '@/app/store';
import { useUserStore } from '@/app/store/useUserStore';

import { PROJECT_NAME } from '@/shared/constants/core';
import { BackIcon, LeftArrow } from '@/shared/icons';
import { getIsMobile } from '@/shared/lib';
import { useNavigate } from 'react-router';

export const Header = () => {
  const navigate = useNavigate();
  const { setIsLoginWidgetOpen } = useWidgetStore();

  const isMobile = getIsMobile();

  const { isAuth, userInfo } = useUserStore();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleChatClick = () => {
    navigate(`/chat/${userInfo._id}`);
  };

  const handleProfileClick = () => {
    navigate(`/my-page/${userInfo._id}`);
  };

  const handleLoginClick = () => {
    setIsLoginWidgetOpen(true);
  };
  const handleNoticeClick = () => {};

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isMobile)
    return (
      <header className="fixed  top-0 left-0 bg-white/70 z-10 w-screen flex justify-between items-cetner h-16 px-[5%] border-b border-primary-mute">
        <button
          onClick={handleBackClick}
          type="button"
          className="w-7 text-2xl font-bold logo-font"
        >
          <LeftArrow />
        </button>
        <button
          onClick={handleLogoClick}
          type="button"
          className="text-2xl font-bold text-primary logo-font"
        >
          {PROJECT_NAME}
        </button>
        <div className="w-7" />
      </header>
    );

  return (
    <header className="fixed  top-0 left-0 bg-white/70 z-10 w-screen flex justify-between items-cetner h-16 px-[5%] border-b border-primary-mute">
      <button
        onClick={handleLogoClick}
        type="button"
        className="text-2xl font-bold text-primary logo-font"
      >
        {PROJECT_NAME}
      </button>

      {isAuth ? (
        <article className="flex items-center gap-5">
          {/* <button onClick={handleChatClick}>공지사항</button> */}
          <button onClick={handleChatClick}>채팅</button>
          {userInfo?.kakaoAuthInfo?.profileImg ? (
            <img
              onClick={handleProfileClick}
              className="w-8 h-8 rounded-full"
              src={userInfo.kakaoAuthInfo.profileImg}
              alt=""
            />
          ) : (
            <div
              onClick={handleProfileClick}
              className="w-8 h-8 rounded-full bg-alt"
            />
          )}
        </article>
      ) : (
        <article className="flex items-center gap-5">
          <button onClick={handleNoticeClick} className="h-8/12 text-xs">
            공지사항
          </button>
          <button onClick={handleLoginClick} className="h-8/12 text-xs">
            로그인
          </button>
        </article>
      )}
    </header>
  );
};
