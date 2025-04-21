import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Step1UserInfo } from './step-1-user-info';
import { Step2Position } from './step-2-position';
import { Step4Project } from './step-4-project';
import { Step5Final } from './step-5-final';
import { Step0Auth } from './step-0-auth';

import { StatusBar, ActionButtonList } from './ui';
import { useUserStore } from '@/app/store/useUserStore';

export const OnboardingProvider = ({ children }) => {
  <div className="pt-20">{children}</div>;
};

export const OnboardingWidget = () => {
  const location = useLocation();
  const { pathname } = location;

  const { isAuth } = useUserStore();

  const isFinalStep = !pathname.includes('final');

  // if (isAuth) return '잘못된 접근입니다.';

  return (
    <React.Fragment>
      <StatusBar />
      <div className="pt-10" />
      <Routes>
        <Route path="auth" element={<Step0Auth />} />
        <Route path="user-info" element={<Step1UserInfo />} />
        <Route path="position" element={<Step2Position />} />
        <Route path="other-info" element={<Step4Project />} />
        <Route path="final" element={<Step5Final />} />
      </Routes>

      {isFinalStep && <ActionButtonList />}
    </React.Fragment>
  );
};
