import { Route, Routes } from 'react-router';
import './App.css';

import { OnboardingWidget } from './widgets/onboarding';
import { LoginPage } from './pages/LoginPage';
import { KakaoCallbackPage } from './pages/kakaoCallbackPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import React from 'react';
import { Header } from './widgets/header';

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="w-screen h-screen overflow-y-scroll">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/auth/kakao-callback" element={<KakaoCallbackPage />} />
          <Route path="/chat/:userId/:roomId?" element={<ChatPage />} />

          <Route path="/onboarding/*" element={<OnboardingWidget />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
