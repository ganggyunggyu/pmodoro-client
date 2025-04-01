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

  const handleNextClick = () => {
    if (pathname.includes('user-info')) {
      navigate('/onboarding/position');
    }
    if (pathname.includes('position')) {
      navigate(`/onboarding/other-info`);
    }
    if (pathname.includes('other-info')) {
      navigate('/onboarding/final');
    }
  };
  const handlePrevClick = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <section className="w-full max-h-fit flex items-center pt-10 mb-10">
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
            기본 정보
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
            희망 직무 정보
          </p>
          <div
            className={`w-16 h-0.5 transition-all
            ${pathname.includes('position') ? 'bg-primary' : 'bg-black-assist'}
            
            `}
          />
          <p
            className={`transition-all ${
              pathname.includes('other-info')
                ? 'text-primary'
                : 'text-black-assist'
            }`}
          >
            참가 정보
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
        <Route path="other-info" element={<Step4Project />} />
        <Route path="final" element={<Step5Final />} />
      </Routes>
      {!pathname.includes('final') && (
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
      )}
    </React.Fragment>
  );
};
