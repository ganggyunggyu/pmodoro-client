import React from 'react';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

import {
  DESIGNER_POSITIONS,
  DEVELOPER_POSITIONS,
  MARKETER_POSITIONS,
  PLANNER_POSITIONS,
} from '@/shared/constants/positions';
import { Button, SelectorButton, XIcon } from '@/shared';
import { DropdownWrapper } from '@/pages/components-page';
export const positions = [
  { id: 'developer', label: '개발자', icon: '💻' },
  { id: 'designer', label: '디자이너', icon: '🎨' },
  { id: 'planner', label: '기획자', icon: '📝' },
  { id: 'marketer', label: '마케터', icon: '📢' },
];

export const Step2Position: React.FC = () => {
  const { onboardingData, setOnboardingField, toggleSkill } =
    useOnboardingStore();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

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
        <p className="text-headline-m">어떤 직무를 희망하시나요?</p>
      </article>
      <section className="w-full h-1/2 grid grid-cols-2 gap-3">
        {positions.map((pos) => {
          return (
            <Button
              key={pos.id}
              onClick={() => handleSelect(pos.label)}
              size="lg"
              variant={
                onboardingData.position === pos.label
                  ? 'outlineBgPrimary2'
                  : 'outlineAlt'
              }
              className="py-7"
            >
              {pos.label}
            </Button>
          );
        })}
      </section>
      <article className="w-full flex flex-col gap-3 ">
        <p className="text-headline-m">
          주로 사용하는 기술 스택은 어떤 건가요?
        </p>
      </article>
      <DropdownWrapper
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        trigger={
          <SelectorButton
            variant="outlineAlt"
            icon="arrow"
            isSelected={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <p
              className={`${
                onboardingData.skills?.length ? 'text-black' : 'text-black-alt'
              }`}
            >
              {onboardingData.skills?.length
                ? onboardingData.skills.join(', ')
                : '기술 스택'}
            </p>
          </SelectorButton>
        }
      >
        <section className="flex flex-col gap-3 max-h-[360px]">
          <header className="w-full flex justify-between sticky top-0 bg-white z-10 px-3 pt-3">
            <p className="text-black text-lg font-semibold">기술 스택</p>
            <button onClick={() => setIsDropdownOpen(false)}>
              <XIcon />
            </button>
          </header>

          <article className="flex flex-col gap-2 overflow-y-auto max-h-[240px] pr-1 p-3">
            {getPositions().map((position) => {
              const isSelected = onboardingData.skills.includes(position);
              return (
                <SelectorButton
                  key={position}
                  icon="check"
                  isSelected={isSelected}
                  onClick={() => toggleSkill(position)}
                >
                  {position}
                </SelectorButton>
              );
            })}
          </article>

          <div className="px-3 pb-3">
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="w-full py-3 bg-primary text-white rounded-md text-sm"
            >
              선택완료
            </button>
          </div>
        </section>
      </DropdownWrapper>
    </div>
  );
};
