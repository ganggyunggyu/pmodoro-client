import KakaoLoginButton from '@/shared/components/KakaoLoginButton';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useUserStore } from '@/app/store/useUserStore';
import { XIcon } from '@/widgets/onboarding/step-1-user-info';
import { useWidgetStore } from '@/app/store';
import { axios } from '../app/config';

export const LoginPage = () => {
  const [isLocalLogin, setIsLocalLogin] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { setIsAuth, setUserInfo } = useUserStore();

  const { setIsLoginWidgetOpen } = useWidgetStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const userInfo = response.data;
        setUserInfo(userInfo);
        setIsAuth(true);

        navigate(`/profile/${userInfo._id}`);
      }
    } catch (error) {
      alert('이메일과 비밀번호를 확인해주세요.');
    }
  };

  const handleLoginClick = () => {
    setIsLocalLogin(true);
  };
  const handleCloseClick = () => {
    setIsLoginWidgetOpen(false);
  };

  const handleFormClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 막기
  };

  return (
    <main
      onClick={handleCloseClick}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-black/20"
    >
      {!isLocalLogin ? (
        <form
          onClick={handleFormClick}
          className="relative p-10
            lg:py-20 lg:px-40 mb-[30%] flex flex-col items-center justify-center gap-5 bg-white rounded-md"
        >
          <button
            onClick={handleCloseClick}
            type="button"
            className="absolute right-5 top-5"
          >
            <XIcon />
          </button>
          <h1 className="text-2xl font-bold">로그인하기</h1>
          <p>지금 로그인하고 여러 팀원들을 찾아보세요!</p>
          <button
            type="button"
            onClick={handleLoginClick}
            className="w-full max-w-xs flex items-center justify-center gap-2 text-black font-bold py-3 px-4 rounded-lg shadow-md transition"
          >
            로그인
          </button>
          <KakaoLoginButton />
          <p className="absolute bottom-2 lg:bottom-10 flex gap-5">
            <span>계정이 없으신가요?</span>
            <Link to={'/onboarding/auth'}>회원가입</Link>
          </p>
        </form>
      ) : (
        <form
          onClick={handleFormClick}
          className="relative py-30 px-50 mb-[30%] flex flex-col items-center justify-center gap-5 bg-white rounded-md"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="border"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="border"
            type="password"
          />

          <button className="border" onClick={handleSubmit} type="button">
            로그인
          </button>
        </form>
      )}
    </main>
  );
};
