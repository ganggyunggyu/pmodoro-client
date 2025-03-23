import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/app/store/useOnboardingStore';

export const Step1UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { name, setName, setPosition, setCareer, setFirstArea, setSecondArea } =
    useOnboardingStore();

  const handleNextClick = () => {
    navigate('/onboarding/position'); // 라우터 이동
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            거주 지역을 입력해주세요{' '}
            <span className="text-gray-500">(선택)</span>
          </label>
          <div className="flex gap-2">
            <select
              onChange={(e) => setFirstArea(e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">지역 선택 (시·도)</option>
              <option value="seoul">서울특별시</option>
              <option value="busan">부산광역시</option>
              <option value="incheon">인천광역시</option>
              <option value="daegu">대구광역시</option>
              <option value="gwangju">광주광역시</option>
              <option value="daejeon">대전광역시</option>
              <option value="ulsan">울산광역시</option>
              <option value="sejong">세종특별자치시</option>
              <option value="gyeonggi">경기도</option>
              <option value="gangwon">강원도</option>
              <option value="chungbuk">충청북도</option>
              <option value="chungnam">충청남도</option>
              <option value="jeonbuk">전라북도</option>
              <option value="jeonnam">전라남도</option>
              <option value="gyeongbuk">경상북도</option>
              <option value="gyeongnam">경상남도</option>
              <option value="jeju">제주특별자치도</option>
            </select>

            <select
              onChange={(e) => setSecondArea(e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">지역 선택 (시·군·구)</option>
              <option value="gangnam">강남구</option>
              <option value="jongno">종로구</option>
              <option value="mapo">마포구</option>
              <option value="yeongdeungpo">영등포구</option>
              <option value="seodaemun">서대문구</option>
              <option value="songpa">송파구</option>
              <option value="yongsan">용산구</option>
              <option value="goyang">고양시</option>
              <option value="suwon">수원시</option>
              <option value="seongnam">성남시</option>
              <option value="bucheon">부천시</option>
              <option value="ansan">안산시</option>
              <option value="anyang">안양시</option>
              <option value="cheonan">천안시</option>
              <option value="jeonju">전주시</option>
              <option value="changwon">창원시</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="w-1/2">
            <label className="block font-semibold text-gray-700 mb-1">
              직무를 입력해주세요 <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">직무 선택</option>
              <option value="developer">소프트웨어 개발</option>
              <option value="designer">UI/UX 디자인</option>
              <option value="pm">프로젝트 매니저</option>
              <option value="marketing">디지털 마케팅</option>
              <option value="data">데이터 분석</option>
              <option value="sales">영업/세일즈</option>
              <option value="hr">인사/채용</option>
              <option value="finance">재무/회계</option>
              <option value="cs">고객 지원</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block font-semibold text-gray-700 mb-1">
              경력을 입력해주세요 <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setCareer(+e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">경력 선택</option>
              <option value="0">신입 (0년)</option>
              <option value="1">1년</option>
              <option value="2">2년</option>
              <option value="3">3년</option>
              <option value="4">4년</option>
              <option value="5">5년</option>
              <option value="6">6년 이상</option>
            </select>
          </div>
        </div>

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
