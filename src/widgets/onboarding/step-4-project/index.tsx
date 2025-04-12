import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { NextIcon, XIcon } from '../step-1-user-info';
import { CAREERS } from '@/shared/constants/positions';
import { REGIONS } from '@/shared/constants/regions';
import { axios } from '@/app/config';
import { useMutation } from '@tanstack/react-query';

export const Step4Project: React.FC = () => {
  const navigate = useNavigate();

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

사용 가능한 기술과 상세 포지션은 ${skills.join(', ')}이며,
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

  return (
    <section className=" lg:text-md w-full flex flex-col items-center justify-center px-[10%] lg:px-[20%]">
      <article className="flex flex-col gap-3 w-full relative">
        <p className="text-lg">온/오프라인 선호도가 있나요?</p>

        <button
          onClick={toggleOnOffSelector}
          className="flex justify-between p-3 w-full text-left border border-alt rounded-lg"
        >
          <p
            className={`${
              onOffPreference.label.length !== 0
                ? 'text-black'
                : 'text-black-alt'
            }`}
          >
            {onOffPreference.label.length !== 0
              ? onOffPreference.label
              : '참여 선호'}
          </p>
          <NextIcon />
        </button>
        {isOnOffSelector && (
          <React.Fragment>
            <div
              onClick={toggleOnOffSelector}
              className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10"
            />
            <article className="z-10">
              <div className="absolute w-full h-90  bg-white left-0 top-1/2 rounded-md">
                <header className="py-3 px-3 w-full flex justify-between">
                  <p className="text-black text-lg font-semibold">참여 선호</p>
                  <button onClick={toggleOnOffSelector}>
                    <XIcon />
                  </button>
                </header>
                <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll ">
                  {[
                    {
                      label: '온라인을 선호해요!',
                      isOnline: true,
                    },
                    {
                      label: '오프라인을 선호해요!',
                      isOnline: false,
                    },
                  ].map((onOff, index) => {
                    return (
                      <li
                        className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
                                        ${
                                          onOff.label === onOffPreference.label
                                            ? 'border-primary'
                                            : 'border-alt'
                                        }
                                        ${
                                          index === CAREERS.length - 1
                                            ? 'last:opacity-50'
                                            : ''
                                        }
                `}
                        key={onOff.label}
                        onClick={() => handleOnOffClick(onOff)}
                      >
                        <p
                          className={`transition-all
                  ${
                    onOff.label === onOffPreference.label
                      ? 'text-primary'
                      : 'text-black'
                  }`}
                        >
                          {onOff.label}
                        </p>
                        <div
                          className={`w-5 h-5 border border-primary rounded-full transition-all
                                      ${
                                        onOff.label === onOffPreference.label
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
                  onClick={toggleOnOffSelector}
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

      {true && (
        <article className="flex flex-col gap-3 pt-4 w-full relative">
          <p className="text-lg">선호하는 지역이 있나요?</p>

          <button
            onClick={toggleAreaSelector}
            className="flex justify-between p-3 w-full text-left border border-alt rounded-lg"
          >
            <p
              className={`${
                onboardingData.firstArea && onboardingData.secondArea
                  ? 'text-black'
                  : 'text-black-alt'
              }`}
            >
              {onboardingData.firstArea ? onboardingData.firstArea : '도'}{' '}
              {onboardingData.secondArea
                ? onboardingData.secondArea
                : '시/군/구'}
            </p>
            <NextIcon />
          </button>
          {isAreaSelector && (
            <React.Fragment>
              <div
                onClick={toggleAreaSelector}
                className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10"
              />
              <article className="z-10">
                <div className="absolute w-full h-90  bg-white left-0 top-10 rounded-md">
                  <header className="py-3 px-3 w-full flex justify-between">
                    <p className="text-black text-lg font-semibold">
                      {onboardingData.firstArea?.length === 0
                        ? '지역'
                        : onboardingData.firstArea}
                    </p>
                    <button onClick={toggleAreaSelector}>
                      <XIcon />
                    </button>
                  </header>
                  <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll ">
                    {!onboardingData.firstArea &&
                      REGIONS.map((regions, index) => {
                        return (
                          <li
                            className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
                                        ${
                                          regions.name ===
                                          onboardingData.firstArea
                                            ? 'border-primary'
                                            : 'border-alt'
                                        }
                                        ${
                                          index === CAREERS.length - 1
                                            ? 'last:opacity-50'
                                            : ''
                                        }
                `}
                            key={regions.name}
                            onClick={() => handleResionClick(regions)}
                          >
                            <p
                              className={`transition-all
                  ${
                    regions.name === onboardingData?.firstArea
                      ? 'text-primary'
                      : 'text-black'
                  }`}
                            >
                              {regions.name}
                            </p>
                            <div
                              className={`w-5 h-5 border border-primary rounded-full transition-all
                                      ${
                                        regions.name ===
                                        onboardingData?.firstArea
                                          ? 'border-4'
                                          : 'border-1'
                                      }
                                      `}
                            />
                          </li>
                        );
                      })}
                    {onboardingData?.firstArea &&
                      citys.map((city, index) => {
                        return (
                          <li
                            className={`p-3 border rounded-md text-sm flex justify-between items-center transition-all
                                        ${
                                          city === onboardingData.secondArea
                                            ? 'border-primary'
                                            : 'border-alt'
                                        }
                                        ${
                                          index === CAREERS.length - 1
                                            ? 'last:opacity-50'
                                            : ''
                                        }
                `}
                            key={city}
                            onClick={() => handleCityClick(city)}
                          >
                            <p
                              className={`transition-all
                  ${
                    city === onboardingData.secondArea
                      ? 'text-primary'
                      : 'text-black'
                  }`}
                            >
                              {city}
                            </p>
                            <div
                              className={`w-5 h-5 border border-primary rounded-full transition-all
                                      ${
                                        city === onboardingData.secondArea
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
                    onClick={toggleAreaSelector}
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
      )}
      <article className="flex flex-col gap-3 w-full py-2">
        <p className="text-lg">
          당신은 어떤 사람인가요? 간단한 자기 소개를 적어주세요!
        </p>
      </article>

      <section className="w-full flex flex-col gap-3">
        <textarea
          value={onboardingData.description}
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
