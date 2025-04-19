import { OnboardingWidget } from '@/widgets';
import { ChatPage } from './chat-page';
import { HomePage } from './home-page';
import { KakaoCallbackPage } from './kakao-callback-page';
import { ProfilePage } from './profile-page';
import { Route, Routes } from 'react-router';
import { Mypage } from './mypage';
import { ComponentsPage } from './components-page';

export const Routing = () => {
  return (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-page/:userId" element={<Mypage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/auth/kakao-callback" element={<KakaoCallbackPage />} />
      <Route path="/chat/:userId/:roomId?" element={<ChatPage />} />

      <Route path="/admin/components/" element={<ComponentsPage />} />

      <Route path="/onboarding/*" element={<OnboardingWidget />} />
    </Routes>
  );
};
