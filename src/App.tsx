import React, { ReactNode } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import './App.css';

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
    <main className="fixed w-screen h-[calc(100vh-var(--spacing)*16)] overflow-y-scroll pt-24 px-[10%]">
      {children}
    </main>
  );
};

function App() {
  const location = useLocation();
  const { pathname } = location;
  const { isLoginWidgetOpen, setIsLoginWidgetOpen } = useWidgetStore();

  const { setIsAuth, setUserInfo, userInfo } = useUserStore();

  const getKakaoLoginCheck = async (authTime, userId) => {
    try {
      const result = await axios.get(
        `/auth/login-check/kakao?auth_time=${authTime}&userId=${userId}`,
      );
      console.log(result);

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

    console.log(userInfo);
    console.log(authTime);
    if (authTime) {
      getKakaoLoginCheck(authTime, userId);
    }
    if (!authTime) {
      console.log('정보 없음');
    }
  }, []);
  return (
    <React.Fragment>
      <Header />
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
      <Footer />
    </React.Fragment>
  );
}

export default App;
