import { Route, Routes } from 'react-router';
import './App.css';

import { OnboardingWidget } from './widgets/onboarding';
import { LoginPage } from './pages/LoginPage';
import { KakaoCallbackPage } from './pages/kakaoCallbackPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/Homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/auth/kakao-callback" element={<KakaoCallbackPage />} />

      <Route path="/onboarding/*" element={<OnboardingWidget />} />
    </Routes>
  );
}

export default App;
