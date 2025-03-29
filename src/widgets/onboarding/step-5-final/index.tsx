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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-700 mb-6">
          프로모도로에 오신 것을 환영합니다!
        </h2>

        <button
          onClick={handleComplete}
          className="w-full py-3 text-white rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 transition"
        >
          완료
        </button>
      </div>
    </div>
  );
};
