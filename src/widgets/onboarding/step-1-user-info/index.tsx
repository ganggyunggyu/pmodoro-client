import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { REGIONS } from '@/shared/constants/regions';
import { CAREERS, JOBS } from '@/shared/constants/positions';

export const NextIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 12L10 17"
        stroke="#37383C"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 12L10 7"
        stroke="#37383C"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Step1UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const handleNextClick = () => {
    navigate('/onboarding/position');
  };

  return (
    <main className="w-full flex flex-col items-center gap-10 ">
      <article className="flex flex-col gap-3 w-6/12">
        <p className="text-lg">사이트에서 어떤 닉네임을 사용할까요?</p>
        <p className="text-black-alt">닉네임은 몇 글자 이상으로 해주세요.</p>
      </article>

      <section className="w-6/12 flex flex-col gap-3">
        <div className="p-3 w-6/12 border border-alt rounded-lg">
          <input type="text" placeholder="닉네임" className="w-full" />
        </div>
        <span className="text-xs text-black-alt">
          닉네임은 몇 글자 이상으로 해주세요.
        </span>
      </section>
      <article className="flex flex-col gap-3 w-6/12">
        <p className="text-lg">현재 경력이 어떻게 되시나요?</p>
        <p className="text-black-alt">
          경력 정보는 세무적인 팀원을 찾는 데 도움이 돼요.
        </p>
        <button className="p-3 w-6/12 text-left text-black-alt border border-alt rounded-lg">
          <p>경력</p>
        </button>
      </article>

      {/* <form className="p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            사용하실 닉네임을 입력해주세요{' '}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="닉네임 입력"
            value={onboardingData.name}
            onChange={(e) => setOnboardingField('name', e.target.value)}
          />
        </div>
        <section>
          <label className="block font-semibold text-gray-700 mb-1">
            거주 지역을 입력해주세요
          </label>

          <select
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setOnboardingField('firstArea', e.target.value);
              setSelectedCity(''); // 지역 변경 시 도시 초기화
            }}
          >
            <option value="">지역 선택 (시·도)</option>
            {REGIONS.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>

          <select
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
            value={selectedCity}
            onChange={(e) => {
              setOnboardingField('secondArea', e.target.value);
              setSelectedCity(e.target.value);
            }}
            disabled={!selectedRegion} // 시·도 선택 전 비활성화
          >
            <option value="">지역 선택 (시·군·구)</option>
            {selectedRegion &&
              REGIONS.find(
                (region) => region.name === selectedRegion,
              )?.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </section>

        <section className="mb-4 flex gap-2">
          <div className="w-1/2">
            <label className="block font-semibold text-gray-700 mb-1">
              직무를 입력해주세요 <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setOnboardingField('job', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {JOBS.map((job) => {
                return (
                  <option key={job.value} value={job.value}>
                    {job.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block font-semibold text-gray-700 mb-1">
              경력을 입력해주세요 <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setOnboardingField('career', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {CAREERS.map((career) => {
                return (
                  <option key={career} value={career}>
                    {career}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <button
          onClick={handleNextClick}
          type="button"
          className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
        >
          다음으로
        </button>
      </form> */}
    </main>
  );
};
