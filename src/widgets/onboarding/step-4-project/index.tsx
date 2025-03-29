import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const Step4Project: React.FC = () => {
  const navigate = useNavigate();

  const {
    onboardingData: { projectList },
    addProject,
    removeProject,
    updateProject,
  } = useOnboardingStore();

  const handleNextClick = () => {
    navigate('/onboarding/final');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          프로젝트 이력을 추가해주세요
        </h2>

        {projectList.map((project) => (
          <div key={project.id} className="bg-gray-300 p-4 rounded-lg mb-4">
            <input
              type="text"
              value={project.name}
              onChange={(e) =>
                updateProject(project.id, 'name', e.target.value)
              }
              placeholder="프로젝트 명"
              className="w-full p-2 border rounded-lg mb-2"
            />

            <div className="flex gap-2 mb-2">
              <select
                className="w-1/4 p-2 border rounded-lg"
                value={project.startYear}
                onChange={(e) =>
                  updateProject(project.id, 'startYear', e.target.value)
                }
              >
                <option value="">XXXX년</option>
                <option value="2024년">2024년</option>
                <option value="2023년">2023년</option>
                <option value="2022년">2022년</option>
              </select>

              <select
                className="w-1/4 p-2 border rounded-lg"
                value={project.startMonth}
                onChange={(e) =>
                  updateProject(project.id, 'startMonth', e.target.value)
                }
              >
                <option value="">XX월</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1}월`}>
                    {i + 1}월
                  </option>
                ))}
              </select>

              <span className="p-2">~</span>

              <select
                className="w-1/4 p-2 border rounded-lg"
                value={project.endYear}
                onChange={(e) =>
                  updateProject(project.id, 'endYear', e.target.value)
                }
              >
                <option value="">XXXX년</option>
                <option value="2024년">2024년</option>
                <option value="2023년">2023년</option>
                <option value="2022년">2022년</option>
              </select>

              <select
                className="w-1/4 p-2 border rounded-lg"
                value={project.endMonth}
                onChange={(e) =>
                  updateProject(project.id, 'endMonth', e.target.value)
                }
              >
                <option value="">XX월</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1}월`}>
                    {i + 1}월
                  </option>
                ))}
              </select>
            </div>

            <textarea
              className="w-full p-2 border rounded-lg mb-2"
              value={project.description}
              onChange={(e) =>
                updateProject(project.id, 'description', e.target.value)
              }
              placeholder="간단한 설명을 적어주세요!"
            />

            {projectList.length > 1 && (
              <button
                onClick={() => removeProject(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                삭제
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addProject}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mb-4"
        >
          + 추가
        </button>

        <button
          onClick={handleNextClick}
          className="w-full py-3 text-white rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 transition"
        >
          다음으로
        </button>
      </div>
    </div>
  );
};
