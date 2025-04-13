import KakaoLoginButton from '@/shared/components/KakaoLoginButton';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useUserStore } from '@/app/store/useUserStore';
import { XIcon } from '@/widgets/onboarding/step-1-user-info';
import { useWidgetStore } from '@/app/store';
import { axios } from '@/app/config';

export const LocalLoginForm = () => {
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

        navigate(`/`);
        setIsLoginWidgetOpen(false);
      }
    } catch (error) {
      alert('이메일과 비밀번호를 확인해주세요.');
    }
  };

  const handleFormClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 막기
  };
  return (
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
  );
};

export const KakaoLoginForm = () => {
  const { setIsLoginWidgetOpen } = useWidgetStore();
  const handleFormClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 막기
  };
  const handleCloseClick = () => {
    setIsLoginWidgetOpen(false);
  };

  return (
    <form
      onClick={handleFormClick}
      className="relative lg:w-1/3 lg:h-1/3 lg:mb-[20%] w-full h-1/2
              flex flex-col items-center justify-center gap-5 bg-white rounded-lg"
    >
      <button
        onClick={handleCloseClick}
        type="button"
        className="absolute right-5 top-5"
      >
        <XIcon />
      </button>
      <h1 className="text-2xl font-bold">시작하기</h1>
      <p>팀원들을 찾기 위한 첫걸음을 시작해요!</p>
      <KakaoLoginButton />
    </form>
  );
};

export const LoginPage = () => {
  const [isLocalLogin, setIsLocalLogin] = React.useState(false);

  const { setIsLoginWidgetOpen } = useWidgetStore();

  const handleCloseClick = () => {
    setIsLoginWidgetOpen(false);
  };

  return (
    <main
      onClick={handleCloseClick}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-black/20"
    >
      {!isLocalLogin ? <KakaoLoginForm /> : <LocalLoginForm />}
    </main>
  );
};
