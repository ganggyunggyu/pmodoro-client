import './App.css';
import React, { ReactNode } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';

import { OnboardingWidget } from './widgets/onboarding';
import { LoginPage } from './pages/LoginPage';
import { KakaoCallbackPage } from './pages/kakaoCallbackPage';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { Header } from './widgets/header';
import { useWidgetStore } from './app/store';
import { Mypage } from './pages/Mypage';
import { ProfilePage } from './pages/ProfilePage';
import { axios } from './app/config';
import { useUserStore } from './app/store/useUserStore';
import { useChatStore } from './app/store/useChatStore';
import { LeftArrow } from './shared/icons';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-screen h-20 px-[10%] flex justify-between bg-primary-mute text-white text-xs">
      <article className="flex items-center gap-3">
        <Link
          to={
            'https://tidal-oval-d41.notion.site/1bdf990b675180859bade3a99096c1fd?pvs=4'
          }
        >
          개인정보 처리방침
        </Link>
        <div className="h-3 w-[1px] bg-white" />
        <Link
          to={
            'https://tidal-oval-d41.notion.site/1bdf990b6751808089e3cd50b9f78af4?pvs=4'
          }
        >
          이용 약관
        </Link>
      </article>

      <article className="flex items-center justify-center">
        <button>문제 신고</button>
      </article>
    </footer>
  );
};

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  return (
    <main className="fixed w-screen h-[calc(100vh-var(--spacing)*16)] overflow-y-scroll pt-24 pb-20 lg:px-[10%] px-[7%]">
      {children}
    </main>
  );
};

export const AuthProvider: React.FC = () => {
  return <main></main>;
};

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
        <p>{otherUserInfo.displayName}</p>
      </div>
    </header>
  );
};

function App() {
  const location = useLocation();
  const { pathname } = location;
  const { isLoginWidgetOpen, setIsLoginWidgetOpen } = useWidgetStore();

  const { setIsAuth, setUserInfo, userInfo } = useUserStore();
  const { currentRoomId } = useChatStore();

  const getKakaoLoginCheck = async (authTime, userId) => {
    try {
      const result = await axios.get(
        `/auth/login-check/kakao?auth_time=${authTime}&userId=${userId}`,
      );

      const userInfo = result.data;

      setUserInfo(userInfo);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isLoginWidgetOpen) setIsLoginWidgetOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const authTime = localStorage.getItem('auth_time');
    const userId = localStorage.getItem('userId');

    if (authTime) {
      getKakaoLoginCheck(authTime, userId);
    }
    if (!authTime) {
      console.log('기존 로그인 정보 없음');
    }
  }, []);

  const isChat = location.pathname.includes('chat');
  return (
    <React.Fragment>
      {isChat && currentRoomId ? <ChatHeader /> : <Header />}
      {isLoginWidgetOpen && <LoginPage />}
      <RouteProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/my-page/:userId" element={<Mypage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/auth/kakao-callback" element={<KakaoCallbackPage />} />
          <Route path="/chat/:userId/:roomId?" element={<ChatPage />} />

          <Route path="/onboarding/*" element={<OnboardingWidget />} />
        </Routes>
      </RouteProvider>
      {!isChat && <Footer />}
    </React.Fragment>
  );
}

export default App;
