import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';
import { REGIONS } from '@/shared/constants/regions';
import { CAREERS, JOBS } from '@/shared/constants/positions';

export const Step1UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const { onboardingData, setOnboardingField } = useOnboardingStore();

  const handleNextClick = () => {
    navigate('/onboarding/position');
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <form className="p-6 rounded-lg shadow-lg w-full max-w-lg">
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
      </form>
    </main>
  );
};
