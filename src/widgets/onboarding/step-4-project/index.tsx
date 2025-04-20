import React from 'react';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

import { REGIONS } from '@/shared/constants/regions';
import { LeftArrow, SelectorButton, XIcon } from '@/shared';
import { DropdownWrapper } from '@/pages/components-page';
import { QuestionHeader } from '@/shared/components/question-header';

export const Step4Project: React.FC = () => {
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const [onOffPreference, setOnOffPreference] = React.useState({
    label: '',
    isOnline: false,
  });

  const [isOnOffSelector, setIsOnOffSelector] = React.useState(false);
  const [isAreaSelector, setIsAreaSelector] = React.useState(false);

  const toggleOnOffSelector = () => {
    setIsOnOffSelector((prev) => !prev);
  };

  const toggleAreaSelector = () => {
    setIsAreaSelector((prev) => !prev);
  };

  const handleOnOffClick = (onOff) => {
    setOnOffPreference(onOff);

    setOnboardingField('isOnline', onOff.isOnline);

    console.log(onboardingData.isOnline);
  };

  const handleResionClick = (resion) => {
    setOnboardingField('firstArea', resion.name);
  };

  const handleCityClick = (city) => {
    setOnboardingField('secondArea', city);
  };

  const getCitys = () => {
    if (onboardingData.firstArea) {
      return REGIONS.find((el) => el.name === onboardingData.firstArea)?.cities;
    } else {
      return [];
    }
  };

  const citys = getCitys();
  const getDescription = ({
    career,
    position,
    displayName,
    skills,
    isOnline,
  }): string => {
    return `${
      career === '신입' ? career : `${career}차`
    } ${position}, ${displayName}입니다.

사용 가능한 기술과 상세 포지션은 ${skills?.join(', ')}이며,
${isOnline ? '온라인' : '오프라인'} 참여를 선호해요.`;
  };

  React.useEffect(() => {
    const newDescription = getDescription(onboardingData);
    setOnboardingField('description', newDescription);
  }, []);
  React.useEffect(() => {
    const newDescription = getDescription(onboardingData);
    setOnboardingField('description', newDescription);
  }, [onboardingData.isOnline]);

  const handleResetFirstArea = () => {
    setOnboardingField('firstArea', '');
    setOnboardingField('secondArea', '');

    document
      .querySelector('.지역리스트')
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className=" lg:text-md w-full flex flex-col gap-3 items-center justify-center px-[10%] lg:px-[20%]">
      <QuestionHeader title="온/오프라인 선호도가 있나요?" className="mb-2" />
      <DropdownWrapper
        isOpen={isOnOffSelector}
        onClose={toggleOnOffSelector}
        trigger={
          <SelectorButton
            variant="outlineAlt"
            icon="arrow"
            isSelected={isOnOffSelector}
            onClick={toggleOnOffSelector}
          >
            <p
              className={`${
                onOffPreference.isOnline !== null
                  ? 'text-black'
                  : 'text-black-alt'
              }`}
            >
              {onOffPreference.isOnline === true && '온라인을 선호해요!'}
              {onOffPreference.isOnline === false && '오프라인을 선호해요!'}
              {onOffPreference.isOnline === null && '참여 선호'}
            </p>
          </SelectorButton>
        }
      >
        <section className="flex flex-col gap-3 max-h-[360px]">
          <header className="w-full flex justify-between sticky top-0 bg-white z-10 px-3 pt-3">
            <p className="text-black text-lg font-semibold">참여 선호</p>
            <button onClick={toggleOnOffSelector}>
              <XIcon />
            </button>
          </header>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[240px] p-3 pr-1">
            {[
              { label: '온라인을 선호해요!', isOnline: true },
              { label: '오프라인을 선호해요!', isOnline: false },
            ].map((onOff) => {
              const isSelected = onOff.label === onOffPreference.label;

              return (
                <SelectorButton
                  key={onOff.label}
                  icon="circle"
                  isSelected={isSelected}
                  onClick={() => handleOnOffClick(onOff)}
                >
                  {onOff.label}
                </SelectorButton>
              );
            })}
          </div>

          <div className="px-3 pb-3">
            <button
              onClick={toggleOnOffSelector}
              className="w-full py-3 bg-primary text-white rounded-md text-sm"
            >
              선택완료
            </button>
          </div>
        </section>
      </DropdownWrapper>

      <QuestionHeader
        title="오프라인 활동이 가능한 위치를 지정해주세요!"
        className="mb-2"
      />
      <DropdownWrapper
        isOpen={isAreaSelector}
        onClose={toggleAreaSelector}
        trigger={
          <SelectorButton
            variant="outlineAlt"
            icon="arrow"
            isSelected={isAreaSelector}
            onClick={toggleAreaSelector}
          >
            <p
              className={`${
                onboardingData.firstArea && onboardingData.secondArea
                  ? 'text-black'
                  : 'text-black-alt'
              }`}
            >
              {onboardingData.firstArea || '도'}{' '}
              {onboardingData.secondArea || '시/군/구'}
            </p>
          </SelectorButton>
        }
      >
        <section className="flex flex-col gap-3 max-h-[360px]">
          <header className="w-full flex justify-between items-center sticky top-0 bg-white z-10 px-3 pt-3">
            <div className="flex items-center gap-2">
              {onboardingData.firstArea && (
                <button
                  onClick={handleResetFirstArea}
                  className="text-sm text-black-alt"
                >
                  <LeftArrow />
                </button>
              )}
              <p className="text-black text-lg font-semibold">
                {onboardingData.firstArea || '지역'}
              </p>
            </div>
            <button onClick={toggleAreaSelector}>
              <XIcon />
            </button>
          </header>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[240px] p-3 pr-1">
            {!onboardingData.firstArea &&
              REGIONS.map((region) => (
                <SelectorButton
                  key={region.name}
                  icon="circle"
                  isSelected={region.name === onboardingData.firstArea}
                  onClick={() => handleResionClick(region)}
                >
                  {region.name}
                </SelectorButton>
              ))}

            {onboardingData.firstArea &&
              citys.map((city) => (
                <SelectorButton
                  key={city}
                  icon="circle"
                  isSelected={city === onboardingData.secondArea}
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </SelectorButton>
              ))}
          </div>

          <div className="px-3 pb-3">
            <button
              onClick={toggleAreaSelector}
              className="w-full py-3 bg-primary text-white rounded-md text-sm"
            >
              선택완료
            </button>
          </div>
        </section>
      </DropdownWrapper>

      <QuestionHeader
        title="당신은 어떤 사람인가요? 자기소개를 적어주세요!"
        className="mb-2"
      />

      <section className="w-full flex flex-col gap-3">
        <textarea
          value={onboardingData?.description ?? ''}
          onChange={(event) => {
            setOnboardingField('description', event.target.value);
          }}
          placeholder="자기소개"
          className="w-full border border-alt rounded-lg p-3"
        />
      </section>
    </section>
  );
};
