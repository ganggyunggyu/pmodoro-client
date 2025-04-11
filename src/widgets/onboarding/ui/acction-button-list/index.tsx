import { axios } from '@/app/config';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { useUserStore } from '@/app/store/useUserStore';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { delay } from '@/shared/lib/delay';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import PulseLoader from 'react-spinners/PulseLoader';

export const ActionButtonList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { onboardingData } = useOnboardingStore();
  const { setIsAuth, setUserInfo } = useUserStore();

  const [isJoinLoading, setIsJoinLoading] = React.useState(false);

  const postJoin = async (onboardingData: any) => {
    try {
      const res = await axios.post('/user/join', { ...onboardingData });

      return res.data;
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      throw new Error('회원가입 요청에 실패했습니다.');
    }
  };

  const useJoinMutation = () => {
    return useMutation({
      mutationKey: ['user-join'],
      mutationFn: postJoin,
      onError: (error: any) => {
        console.error('회원가입 중 에러 발생:', error.message);
      },
      onSuccess: (data: any) => {},
    });
  };

  const { mutate } = useJoinMutation();

  const handleNextClick = async () => {
    if (pathname.includes('user-info')) {
      navigate('/onboarding/position');
    }
    if (pathname.includes('position')) {
      navigate(`/onboarding/other-info`);
    }
    if (pathname.includes('other-info')) {
      mutate(onboardingData, {
        onSuccess: async (data) => {
          console.log(data);

          const { userInfo } = data;

          localStorage.setItem('userId', userInfo._id);

          setUserInfo(userInfo);
          setIsAuth(true);
          setIsJoinLoading(true);
          await delay(1000);
          navigate('/onboarding/final');
        },
        onError: (error) => {
          console.error(error);
          alert('회원가입에 실패했습니다. 다시 시도해주세요');
          navigate('/');
        },
      });
    }
  };
  const handlePrevClick = () => {
    navigate(-1);
  };

  const getIsActive = () => {
    if (isJoinLoading) {
      return false;
    }
    if (pathname.includes('user-info')) {
      return onboardingData.displayName && onboardingData.career;
    }
    if (pathname.includes('position')) {
      return onboardingData.position && onboardingData.skills.length !== 0;
    }
    if (pathname.includes('other-info')) {
      return (
        onboardingData.isOnline !== null && onboardingData.description !== ''
      );
    }
  };
  const isActive = getIsActive();

  return (
    <React.Fragment>
      {isJoinLoading && (
        <div className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-50 color-primary">
          <PulseLoaderSpinner />
        </div>
      )}
      <section className="absolute lg:bottom-2/12 md:bottom-1/12 bottom-1/12 w-full flex itmes-center justify-between left-1/2 -translate-x-1/2 px-[10%] lg:px-[20%] transition-all">
        <button
          onClick={handlePrevClick}
          className="border border-primary text-primary px-3 py-1 text-sm rounded-lg"
        >
          이전
        </button>
        <button
          onClick={handleNextClick}
          className={` text-white px-3 py-1 text-sm rounded-lg transition-colors
          ${isActive ? 'bg-primary border border-primary' : 'bg-neutral-300'}
          `}
          disabled={!isActive}
        >
          다음
        </button>
      </section>
    </React.Fragment>
  );
};
