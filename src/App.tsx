import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import { OnboardingWidget } from './widgets/onboarding';
import { LoginPage } from './pages/LoginPage';
import { KakaoCallbackPage } from './pages/kakaoCallbackPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { Header } from './widgets/header';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-screen h-20 px-10 flex justify-between bg-primary-mute text-white text-xs">
      <article className="flex items-center gap-3">
        <button>개인정보 처리방침</button>
        <div className="h-3 w-[1px] bg-white" />
        <button>이용 약관</button>
      </article>

      <article className="flex items-center justify-center">
        <button>문제 신고</button>
      </article>
    </footer>
  );
};

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="fixed w-screen h-[calc(100vh-var(--spacing)*16)] overflow-y-scroll pt-16">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/auth/kakao-callback" element={<KakaoCallbackPage />} />
          <Route path="/chat/:userId/:roomId?" element={<ChatPage />} />

          <Route path="/onboarding/*" element={<OnboardingWidget />} />
        </Routes>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
