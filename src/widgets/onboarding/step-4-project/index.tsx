import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { NextIcon, XIcon } from '../step-1-user-info';
import { CAREERS } from '@/shared/constants/positions';
import { REGIONS } from '@/shared/constants/regions';

export const Step4Project: React.FC = () => {
  const navigate = useNavigate();

  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const [onOffPreference, setOnOffPreference] = React.useState({
    label: '',
  });

  const handleNextClick = () => {
    navigate('/onboarding/final');
  };

  const [isOnOffSelector, setIsOnOffSelector] = React.useState(false);
  const [isAreaSelector, setIsAreaSelector] = React.useState(false);

  const toggleOnOffSelector = () => {
    setIsOnOffSelector((prev) => !prev); // 경력 선택 토글
  };

  const toggleAreaSelector = () => {
    setIsAreaSelector((prev) => !prev); // 지역 선택 토글
  };

  const handleOnOffClick = (onOff) => {
    setOnOffPreference(onOff);
  };

  const handleResionClick = (resion) => {
    console.log(resion);

    setOnboardingField('firstArea', resion.name);

    console.log(citys);
  };

  const handleCityClick = (city) => {
    setOnboardingField('secondArea', city);
  };

  const getCitys = () => {
    if (onboardingData.firstArea !== '') {
      return REGIONS.find((el) => el.name === onboardingData.firstArea)?.cities;
    } else {
      return [];
    }
  };

  const citys = getCitys();

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <article className="flex flex-col gap-3 w-6/12 relative">
        <p className="text-lg">온/오프라인 선호도가 있나요?</p>

        <button
          onClick={toggleOnOffSelector}
          className="flex justify-between p-3 w-6/12 text-left border border-alt rounded-lg"
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
                    },
                    {
                      label: '오프라인을 선호해요!',
                    },
                    {
                      label: '그닥 상관 없어요!',
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

      <article className="flex flex-col gap-3 w-6/12 relative">
        <p className="text-lg">선호하는 지역이 있나요?</p>

        <button
          onClick={toggleAreaSelector}
          className="flex justify-between p-3 w-6/12 text-left border border-alt rounded-lg"
        >
          <p
            className={`${
              onboardingData.firstArea.length !== 0 &&
              onboardingData.secondArea.length !== 0
                ? 'text-black'
                : 'text-black-alt'
            }`}
          >
            {onboardingData.firstArea ? onboardingData.firstArea : '도'}{' '}
            {onboardingData.secondArea ? onboardingData.secondArea : '시/군/구'}
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
              <div className="absolute w-120 h-90  bg-white -right-1/4 top-1/2 rounded-md">
                <header className="py-3 px-3 w-full flex justify-between">
                  <p className="text-black text-lg font-semibold">
                    {onboardingData.firstArea.length === 0
                      ? '지역'
                      : onboardingData.firstArea}
                  </p>
                  <button onClick={toggleAreaSelector}>
                    <XIcon />
                  </button>
                </header>
                <ul className="p-3 h-60 flex flex-col gap-2 overflow-y-scroll ">
                  {onboardingData.firstArea.length === 0 &&
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
                    regions.name === onboardingData.firstArea
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
                                        onboardingData.firstArea
                                          ? 'border-4'
                                          : 'border-1'
                                      }
                                      `}
                          />
                        </li>
                      );
                    })}
                  {onboardingData.firstArea.length !== 0 &&
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
    </section>
    // <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //   <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
    //     <h2 className="text-lg font-bold text-gray-700 mb-4">
    //       프로젝트 이력을 추가해주세요
    //     </h2>

    //     {projectList.map((project) => (
    //       <div key={project.id} className="bg-gray-300 p-4 rounded-lg mb-4">
    //         <input
    //           type="text"
    //           value={project.name}
    //           onChange={(e) =>
    //             updateProject(project.id, 'name', e.target.value)
    //           }
    //           placeholder="프로젝트 명"
    //           className="w-full p-2 border rounded-lg mb-2"
    //         />

    //         <div className="flex gap-2 mb-2">
    //           <select
    //             className="w-1/4 p-2 border rounded-lg"
    //             value={project.startYear}
    //             onChange={(e) =>
    //               updateProject(project.id, 'startYear', e.target.value)
    //             }
    //           >
    //             <option value="">XXXX년</option>
    //             <option value="2024년">2024년</option>
    //             <option value="2023년">2023년</option>
    //             <option value="2022년">2022년</option>
    //           </select>

    //           <select
    //             className="w-1/4 p-2 border rounded-lg"
    //             value={project.startMonth}
    //             onChange={(e) =>
    //               updateProject(project.id, 'startMonth', e.target.value)
    //             }
    //           >
    //             <option value="">XX월</option>
    //             {[...Array(12)].map((_, i) => (
    //               <option key={i + 1} value={`${i + 1}월`}>
    //                 {i + 1}월
    //               </option>
    //             ))}
    //           </select>

    //           <span className="p-2">~</span>

    //           <select
    //             className="w-1/4 p-2 border rounded-lg"
    //             value={project.endYear}
    //             onChange={(e) =>
    //               updateProject(project.id, 'endYear', e.target.value)
    //             }
    //           >
    //             <option value="">XXXX년</option>
    //             <option value="2024년">2024년</option>
    //             <option value="2023년">2023년</option>
    //             <option value="2022년">2022년</option>
    //           </select>

    //           <select
    //             className="w-1/4 p-2 border rounded-lg"
    //             value={project.endMonth}
    //             onChange={(e) =>
    //               updateProject(project.id, 'endMonth', e.target.value)
    //             }
    //           >
    //             <option value="">XX월</option>
    //             {[...Array(12)].map((_, i) => (
    //               <option key={i + 1} value={`${i + 1}월`}>
    //                 {i + 1}월
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <textarea
    //           className="w-full p-2 border rounded-lg mb-2"
    //           value={project.description}
    //           onChange={(e) =>
    //             updateProject(project.id, 'description', e.target.value)
    //           }
    //           placeholder="간단한 설명을 적어주세요!"
    //         />

    //         {projectList.length > 1 && (
    //           <button
    //             onClick={() => removeProject(project.id)}
    //             className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
    //           >
    //             삭제
    //           </button>
    //         )}
    //       </div>
    //     ))}

    //     <button
    //       onClick={addProject}
    //       className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mb-4"
    //     >
    //       + 추가
    //     </button>

    //     <button
    //       onClick={handleNextClick}
    //       className="w-full py-3 text-white rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 transition"
    //     >
    //       다음으로
    //     </button>
    //   </div>
    // </div>
  );
};
