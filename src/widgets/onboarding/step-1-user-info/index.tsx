import React from 'react';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { CAREERS } from '@/shared/constants/positions';
import { Button, SelectorButton, XIcon } from '@/shared';
import { Input } from '@/shared/components/input';
import { DropdownWrapper } from '@/pages/components-page';

export const Step1UserInfo: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isCareearSelect, setIsCareearSelect] = React.useState(false);
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const handleCareearClick = (career) => {
    setOnboardingField('career', career);
  };
  const handleCloseCareearSelect = () => {
    setIsCareearSelect(false); // 이 함수로 클릭 시 상태 변경
  };

  return (
    <main className="w-full flex flex-col items-center gap-5 px-[5%] lg:px-[20%]">
      <article className="w-full flex flex-col gap-3">
        <p className="text-headline-m">사이트에서 어떤 닉네임을 사용할까요?</p>
      </article>

      <div className="w-full">
        <Input
          value={onboardingData?.displayName ?? ''}
          onChange={(event) => {
            setOnboardingField('displayName', event.target.value);
          }}
          type="text"
          placeholder="닉네임"
          helperMessage="닉네임은 몇 글자 이상으로 해주세요."
        />
      </div>

      <DropdownWrapper
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        trigger={
          <div>
            <article className="w-full flex flex-col mb-4 gap-1">
              <p className="text-headline-m">현재 경력이 어떻게 되시나요?</p>
              <p className="text-body-normal-m text-black-alt">
                경력 정보는 세부적인 팀원을 찾는 데 도움이 돼요.
              </p>
            </article>
            <SelectorButton
              variant="outlineAlt"
              icon="arrow"
              isSelected={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p
                className={`${
                  onboardingData.career ? 'text-black' : 'text-black-alt'
                }`}
              >
                {onboardingData.career ? onboardingData.career : '경력'}
              </p>
            </SelectorButton>
          </div>
        }
      >
        <section className="flex flex-col gap-3 p-3">
          <header className="w-full flex justify-between sticky top-0 bg-white z-10">
            <p className="text-black text-lg font-semibold">경력</p>
            <button onClick={() => setIsDropdownOpen(false)}>
              <XIcon />
            </button>
          </header>

          <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-[200px] md:max-h-[250px] lg:max-h-[300px]">
            {CAREERS.map((career, idx) => (
              <SelectorButton
                key={idx}
                icon="circle"
                isSelected={career === onboardingData.career}
                onClick={() => handleCareearClick(career)}
              >
                {career}
              </SelectorButton>
            ))}
          </div>

          <div className="px-3 pb-3">
            <Button
              onClick={() => setIsDropdownOpen(false)}
              className="w-full py-3 bg-primary text-white rounded-md text-sm"
            >
              선택완료
            </Button>
          </div>
        </section>
      </DropdownWrapper>
    </main>
  );
};
