import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const Step3_1PositionDeveloper: React.FC = () => {
  const navigate = useNavigate();
  const { detailPositionList, setDetailPositionList } = useOnboardingStore();

  const positions = [
    '프론트엔드 개발자',
    '백엔드 개발자',
    '풀스택 개발자',
    '앱 개발자',
    'AI 개발자',
    '게임 개발자',
  ];

  const toggleSelect = (pos: string) => {
    setDetailPositionList(pos); // 토글 함수면 내부에서 포함 여부 처리
  };

  const handleNext = () => {
    if (detailPositionList.length > 0) {
      navigate('/onboarding/project');
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          개발 포지션을 선택해주세요
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => toggleSelect(pos)}
              className={`px-4 py-2 rounded-full border-2 transition ${
                detailPositionList.includes(pos)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={detailPositionList.length === 0}
          className={`w-full py-3 text-white rounded-lg font-semibold transition ${
            detailPositionList.length > 0
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          다음으로
        </button>
      </section>
    </main>
  );
};
