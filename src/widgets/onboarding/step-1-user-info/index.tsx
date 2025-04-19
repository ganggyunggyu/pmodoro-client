import React from 'react';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { CAREERS } from '@/shared/constants/positions';
import { OnboardingInput } from '../ui';
import { NextIcon, XIcon } from '@/shared';

export const Step1UserInfo: React.FC = () => {
  const [isCareearSelect, setIsCareearSelect] = React.useState(false);
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const handleCareearClick = (career) => {
    setOnboardingField('career', career);
  };
  const handleCloseCareearSelect = () => {
    setIsCareearSelect(false); // 이 함수로 클릭 시 상태 변경
  };

  return (
    <main className="w-full flex flex-col items-center gap-10 px-[5%] lg:px-[20%]">
      <article className="w-full flex flex-col gap-3">
        <p className="text-lg">사이트에서 어떤 닉네임을 사용할까요?</p>
        <p className="text-black-alt">닉네임은 몇 글자 이상으로 해주세요.</p>
      </article>

      <OnboardingInput
        value={onboardingData.displayName}
        onChange={(event) => {
          setOnboardingField('displayName', event.target.value);
        }}
        type="text"
        placeholder="닉네임"
        className="w-full"
        helper="닉네임은 몇 글자 이상으로 해주세요."
      />
      <article className="w-full flex flex-col gap-3 relative">
        <p className="text-lg">현재 경력이 어떻게 되시나요?</p>
        <p className="text-black-alt">
          경력 정보는 세무적인 팀원을 찾는 데 도움이 돼요.
        </p>
        <button
          onClick={() => setIsCareearSelect(true)}
          className="flex justify-between p-3 w-full text-left border border-alt rounded-lg"
        >
          <p
            className={`${
              onboardingData.career ? 'text-black' : 'text-black-alt'
            }`}
          >
            {onboardingData.career ? onboardingData.career : '경력'}
          </p>
          <NextIcon />
        </button>
        {isCareearSelect && (
          <React.Fragment>
            <div
              onClick={handleCloseCareearSelect}
              className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10"
            />
            <article className="z-10">
              <div className="absolute w-full h-90  bg-white left-0 lg:-top-10 -top-30 rounded-md">
                <header className="py-3 px-3 w-full flex justify-between">
                  <p className="text-black text-lg font-semibold">경력</p>
                  <button onClick={handleCloseCareearSelect}>
                    <XIcon />
                  </button>
                </header>
                <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll ">
                  {CAREERS.map((career, index) => {
                    return (
                      <li
                        className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
                                ${
                                  career === onboardingData.career
                                    ? 'border-primary'
                                    : 'border-alt'
                                }
        `}
                        key={career}
                        onClick={() => handleCareearClick(career)}
                      >
                        <p
                          className={`transition-all
          ${career === onboardingData.career ? 'text-primary' : 'text-black'}`}
                        >
                          {career}
                        </p>
                        <div
                          className={`w-5 h-5 border border-primary rounded-full transition-all
                              ${
                                career === onboardingData.career
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
                  onClick={handleCloseCareearSelect}
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
    </main>
  );
};
