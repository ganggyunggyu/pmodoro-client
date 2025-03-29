import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import {
  DEVELOPER_POSITIONS,
  DESIGNER_POSITIONS,
  PLANNER_POSITIONS,
  MARKETER_POSITIONS,
} from '@/shared/constants/positions';

export const Step3PositionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { position } = useParams();

  const {
    onboardingData: { detailPositionList },
    toggleDetailPosition,
  } = useOnboardingStore();

  const getPositions = () => {
    if (position === 'developer') return DEVELOPER_POSITIONS;
    if (position === 'designer') return DESIGNER_POSITIONS;
    if (position === 'planner') return PLANNER_POSITIONS;
    if (position === 'marketer') return MARKETER_POSITIONS;
    return [];
  };

  const positions = getPositions();

  const handleNext = () => {
    if (detailPositionList.length > 0) {
      if (position === 'developer') {
        navigate('/onboarding/position/developer/tech-stack');
      } else {
        navigate('/onboarding/project');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          가능한 포지션을 모두 선택해주세요
        </h2>

        <div className="flex flex-wrap gap-2 justify-center p-4 bg-white rounded-lg">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => toggleDetailPosition(pos)}
              className={`px-4 py-2 rounded-full border-2 transition ${
                detailPositionList.includes(pos)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={detailPositionList.length === 0}
          className={`w-full mt-6 py-3 text-white rounded-lg font-semibold transition ${
            detailPositionList.length > 0
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};
