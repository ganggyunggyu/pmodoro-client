import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Step1UserInfo } from './step-1-user-info';
import { Step2Position } from './step-2-position';
import { Step3PositionDetail } from './step-3-position-detail';
import { Step4Project } from './step-4-project';
import { Step5Final } from './step-5-final';
import { Step3_1PositionDeveloper } from './step-3-1-developer';
import { Step0Auth } from './step-0-auth';

export const OnboardingWidget = () => {
  return (
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
  );
};
