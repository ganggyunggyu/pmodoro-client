import { axios } from '@/app/config';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { delay } from '@/shared/lib/delay';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';

export const ActionButtonList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { onboardingData } = useOnboardingStore();

  const postJoin = async (onboardingData: any) => {
    try {
      const res = await axios.post('/user/join', { ...onboardingData });
      console.log(res);
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
      onSuccess: (data: any) => {
        console.log('회원가입 성공:', data);
      },
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
      console.log(onboardingData);
      mutate(onboardingData);
      await delay(1000);
      navigate('/onboarding/final');
    }
  };
  const handlePrevClick = () => {
    navigate(-1);
  };

  const getIsActive = () => {
    if (pathname.includes('user-info')) {
      return onboardingData.displayName && onboardingData.career;
    }
    if (pathname.includes('position')) {
      return onboardingData.position && onboardingData.skills;
    }
    if (pathname.includes('other-info')) {
      return onboardingData.description;
    }
  };
  const isActive = getIsActive();

  return (
    <section className="absolute bottom-3/12 w-6/12 flex itmes-center justify-between left-1/2 -translate-x-1/2">
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
  );
};
