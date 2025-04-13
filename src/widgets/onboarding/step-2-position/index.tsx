import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { NextIcon, XIcon } from '../step-1-user-info';
import {
  DESIGNER_POSITIONS,
  DEVELOPER_POSITIONS,
  MARKETER_POSITIONS,
  PLANNER_POSITIONS,
} from '@/shared/constants/positions';

export const Step2Position: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingField, toggleSkill } =
    useOnboardingStore();
  const [isPositionSelect, setIsPositionSelect] = React.useState(false);

  const handlePositionSelect = () => {
    setIsPositionSelect(!isPositionSelect);
  };

  const positions = [
    { id: 'developer', label: '개발자', icon: '💻' },
    { id: 'designer', label: '디자이너', icon: '🎨' },
    { id: 'planner', label: '기획자', icon: '📝' },
    { id: 'marketer', label: '마케터', icon: '📢' },
  ];

  const handleSelect = (position: string) => {
    setOnboardingField('position', position);
    setOnboardingField('skills', []);

    getPositions();
  };

  const getPositions = () => {
    if (onboardingData.position === '개발자') return DEVELOPER_POSITIONS;
    if (onboardingData.position === '디자이너') return DESIGNER_POSITIONS;
    if (onboardingData.position === '기획자') return PLANNER_POSITIONS;
    if (onboardingData.position === '마케터') return MARKETER_POSITIONS;
    return [];
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 px-[10%] lg:px-[20%]">
      <article className="w-full flex flex-col gap-3 ">
        <p className="text-lg">어떤 직무를 희망하시나요?</p>
      </article>
      <section className="w-full h-1/2 grid grid-cols-2 gap-3">
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
      <article className="flex flex-col gap-3 w-full  relative">
        <p className="text-lg">주로 사용하는 기술 스택은 어떤 건가요?</p>

        <button
          onClick={() => setIsPositionSelect(true)}
          className="flex justify-between p-3 w-full text-left border border-alt rounded-lg"
        >
          <p
            className={`${
              onboardingData.skills ? 'text-black-alt' : 'text-black'
            }`}
          >
            {onboardingData.skills
              ? onboardingData.skills?.join(', ')
              : '기술 스택'}
          </p>
          <NextIcon />
        </button>
        {isPositionSelect && (
          <React.Fragment>
            <div
              onClick={handlePositionSelect}
              className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10"
            />
            <article className="z-10 ">
              <div className="absolute w-full h-90  bg-white left-0 lg:top-10 -top-30 rounded-md">
                <header className="py-3 px-3 w-full flex justify-between">
                  <p className="text-black text-lg font-semibold">기술 스택</p>
                  <button onClick={handlePositionSelect}>
                    <XIcon />
                  </button>
                </header>
                <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll ">
                  {getPositions().map((position, index) => {
                    return (
                      <li
                        className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
                                        ${
                                          onboardingData.skills.includes(
                                            position,
                                          )
                                            ? 'border-primary'
                                            : 'border-alt'
                                        }
                                        
                `}
                        key={position}
                        onClick={() => toggleSkill(position)}
                      >
                        <p
                          className={`transition-all
                  ${
                    onboardingData.skills.includes(position)
                      ? 'text-primary'
                      : 'text-black'
                  }`}
                        >
                          {position}
                        </p>
                        <div
                          className={`w-5 h-5 border border-primary rounded-full transition-all
                                      ${
                                        onboardingData.skills.includes(position)
                                          ? 'border-4'
                                          : 'border-1'
                                      }
                                      `}
                        />
                      </li>
                    );
                  })}
                </ul>
                <div
                  onClick={handlePositionSelect}
                  className="w-full flex items-center justify-center"
                >
                  <button className="px-20 py-3 bg-primary text-white rounded-md text-sm">
                    선택완료
                  </button>
                </div>
              </div>
            </article>
          </React.Fragment>
        )}
      </article>
    </div>
  );
};
