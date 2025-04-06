import { KAKAO_REDIRECT_URI } from '../constants/env-config';

const KakaoLoginButton = () => {
  const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=592b7c49df0845263bf62a37723069f2&redirect_uri=${
    import.meta.env.VITE_KAKAO_REDIRECT_URI
  }&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = CALLBACK;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#FEE500] text-black font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#FAD800] transition"
    >
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
