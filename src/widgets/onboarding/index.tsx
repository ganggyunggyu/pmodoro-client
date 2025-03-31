import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { Step1UserInfo } from './step-1-user-info';
import { Step2Position } from './step-2-position';
import { Step3PositionDetail } from './step-3-position-detail';
import { Step4Project } from './step-4-project';
import { Step5Final } from './step-5-final';
import { Step3_1PositionDeveloper } from './step-3-1-developer';
import { Step0Auth } from './step-0-auth';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const OnboardingWidget = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const {
    onboardingData: { position },
  } = useOnboardingStore();
  const positions = [
    { id: 'developer', label: '개발자', icon: '💻' },
    { id: 'designer', label: '디자이너', icon: '🎨' },
    { id: 'planner', label: '기획자', icon: '📝' },
    { id: 'marketer', label: '마케터', icon: '📢' },
  ];

  const handleNextClick = () => {
    if (pathname.includes('user-info')) {
      navigate('/onboarding/position');
    }
    if (pathname.includes('position')) {
      const id = positions.find((pos) => pos.label === position);
      navigate(`/onboarding/position/${id.id}`);
    }
  };
  const handlePrevClick = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <section className="w-full max-h-fit flex items-center mb-10">
        <div className=" w-full flex items-center justify-center gap-7">
          <p
            className={`transition-all
            ${
              pathname.includes('user-info')
                ? 'text-primary'
                : 'text-black-assist'
            }
            `}
          >
            닉네임 입력
          </p>
          <div
            className={`w-16 h-0.5 transition-all
            ${pathname.includes('user-info') ? 'bg-primary' : 'bg-black-assist'}
            
            `}
          />
          <p
            className={`transition-all ${
              pathname.includes('position')
                ? 'text-primary'
                : 'text-black-assist'
            }`}
          >
            희망 직무선택
          </p>
          <div
            className={`w-16 h-0.5 transition-all
            ${pathname.includes('position') ? 'bg-primary' : 'bg-black-assist'}
            
            `}
          />
          <p
            className={`transition-all ${
              pathname.includes('carrear')
                ? 'text-primary'
                : 'text-black-assist'
            }`}
          >
            경력 입력
          </p>
        </div>
      </section>
      <Routes>
        <Route path="auth" element={<Step0Auth />} />
        <Route path="user-info" element={<Step1UserInfo />} />
        <Route path="position" element={<Step2Position />} />
        <Route path="position/:position" element={<Step3PositionDetail />} />
        <Route
          path="position/developer/tech-stack"
          element={<Step3_1PositionDeveloper />}
        />
        <Route path="project" element={<Step4Project />} />
        <Route path="final" element={<Step5Final />} />
      </Routes>
      <section className="absolute bottom-4/12 w-6/12 flex itmes-center justify-between left-1/2 -translate-x-1/2">
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
    </React.Fragment>
  );
};
