import KakaoLoginButton from '@/shared/components/KakaoLoginButton';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios'; // axios 추가
import { useUserStore } from '@/app/store/useUserStore';

export const LoginPage = () => {
  const [isLocalLogin, setIsLocalLogin] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { setIsAuth, setUserInfo } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
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

  return (
    <main className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      {isLocalLogin ? (
        <section className="flex flex-col gap-4 p-6">
          <input
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            다음
          </button>
        </section>
      ) : (
        <form className="w-120 h-100 flex flex-col items-center justify-center gap-5 ">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p>지금 로그인하고 여러 팀원들을 찾아보세요!</p>
          <button
            type="button"
            onClick={handleLoginClick}
            className="w-full max-w-xs flex items-center justify-center gap-2 text-black font-bold py-3 px-4 rounded-lg shadow-md transition"
          >
            로그인
          </button>
          <KakaoLoginButton />
          <p>
            계정이 없으십니까? <Link to={'/onboarding/auth'}>회원가입</Link>
          </p>
        </form>
      )}
    </main>
  );
};
