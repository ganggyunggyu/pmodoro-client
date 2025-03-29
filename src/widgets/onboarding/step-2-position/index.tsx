import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const Step2Position: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingField } = useOnboardingStore();
  const [position, setPosition] = React.useState('');
  const positions = [
    { id: 'developer', label: '개발자', icon: '💻' },
    { id: 'designer', label: '디자이너', icon: '🎨' },
    { id: 'planner', label: '기획자', icon: '📝' },
    { id: 'marketer', label: '마케터', icon: '📢' },
  ];

  const handleSelect = (position: string) => {
    setPosition(position);
  };

  const handleNextClick = () => {
    if (position) {
      setOnboardingField('position', position);
      const id = positions.find((pos) => pos.label === position);
      navigate(`/onboarding/position/${id.id}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          희망하시는 포지션을 선택해 주세요
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => handleSelect(pos.label)}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${
                position === pos.label
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{pos.icon}</span>
              <span className="text-gray-700 font-medium">{pos.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNextClick}
          disabled={!position}
          className={`w-full mt-6 py-3 text-white rounded-lg font-semibold transition ${
            position
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
