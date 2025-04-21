import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { Input } from '@/shared/components/input';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Step0Auth = () => {
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { setOnboardingField } = useOnboardingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setOnboardingField('email', id); // zustand에 이메일 저장
    setOnboardingField('password', password); // zustand에 비밀번호 저장

    navigate('/onboarding/user-info'); // 다음 페이지로 이동
  };

  return (
    <form
      className="flex flex-col gap-6 p-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="아이디 입력"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />

      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />

      <button
        type="submit"
        className="py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300"
      >
        다음
      </button>
    </form>
  );
};
