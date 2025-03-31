import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const Step2Position: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const positions = [
    { id: 'developer', label: '개발자', icon: '💻' },
    { id: 'designer', label: '디자이너', icon: '🎨' },
    { id: 'planner', label: '기획자', icon: '📝' },
    { id: 'marketer', label: '마케터', icon: '📢' },
  ];

  const handleSelect = (position: string) => {
    // setPosition(position);
    setOnboardingField('position', position);
  };

  const handleNextClick = () => {
    if (onboardingData.position) {
      const id = positions.find((pos) => pos.label === onboardingData.position);
      navigate(`/onboarding/position/${id.id}`);
    }
  };

  return (
    <div className="flex flex-col w-full h-[46%] justify-center items-center gap-6">
      <article className="flex flex-col gap-3 w-6/12">
        <p className="text-lg">희망하는 직무를 선택해주세요.</p>
      </article>
      <section className="w-6/12 h-full grid grid-cols-2 gap-3">
        {positions.map((pos) => {
          return (
            <button
              key={pos.id}
              onClick={() => handleSelect(pos.label)}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition cursor-pointer hover:bg-rose-100 
                ${
                  onboardingData.position === pos.label
                    ? 'border-primary bg-paimary-mute'
                    : 'border-alt bg-white'
                }`}
            >
              {pos.label}
            </button>
          );
        })}
      </section>
      {/* <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
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
      </div> */}
    </div>
  );
};
