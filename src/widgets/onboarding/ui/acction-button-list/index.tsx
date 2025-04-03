import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { delay } from '@/shared/lib/delay';
import { useLocation, useNavigate } from 'react-router';

export const ActionButtonList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { onboardingData } = useOnboardingStore();

  const handleNextClick = async () => {
    if (pathname.includes('user-info')) {
      navigate('/onboarding/position');
    }
    if (pathname.includes('position')) {
      navigate(`/onboarding/other-info`);
    }
    if (pathname.includes('other-info')) {
      console.log(onboardingData);
      await delay(1000);
      navigate('/onboarding/final');
    }
  };
  const handlePrevClick = () => {
    navigate(-1);
  };

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
        className="border border-primary bg-primary text-white px-3 py-1 text-sm rounded-lg"
      >
        다음
      </button>
    </section>
  );
};
