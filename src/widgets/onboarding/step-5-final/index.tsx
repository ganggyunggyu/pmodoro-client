import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/app/store/useUserStore';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import axios from 'axios';

export const Step5Final: React.FC = () => {
  const navigate = useNavigate();

  const { getOnboardingData } = useOnboardingStore();
  const onboardingData = getOnboardingData();

  const { userInfo, setIsAuth, setUserInfo } = useUserStore();

  const handleComplete = async () => {
    const signupData = {
      ...userInfo,
      ...onboardingData,
    };
    console.log(signupData);
    const result = await axios.post(
      'http://localhost:3000/user/join',
      signupData,
    );

    setUserInfo(result.data.userInfo);
    console.log(result.data.userInfo);
    setIsAuth(true);

    navigate(`/profile/${result.data.userInfo._id}`);
  };

  return (
    <div className="flex flex-col items-center w-10/12">
      <div>
        <h1 className="text-2xl font-semibold">회원가입이 완료되었어요!</h1>
        <p className="text-black-alt pt-2">프로젝트 경험함도 추가하면</p>
        <p className="text-black-alt">더 많은 채팅을 받을 수 있어요!</p>
      </div>
      <div className="w-full flex justify-center gap-5 pt-10">
        <button className="bg-primary px-4 py-2 text-white rounded-md text-sm">
          세부 정보 입력하기
        </button>
        <button className="bg-white border border-primary text-primary px-4 py-2 rounded-md text-sm">
          홈으로
        </button>
      </div>
    </div>
  );
};
