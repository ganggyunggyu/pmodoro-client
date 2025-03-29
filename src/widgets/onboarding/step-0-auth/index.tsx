import { useOnboardingStore } from '@/app/store/useOnboardingStore';
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
    <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="아이디 입력"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        다음
      </button>
    </form>
  );
};
