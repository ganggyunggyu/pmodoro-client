export const LOCAL_CALLBACK =
  'https://kauth.kakao.com/oauth/authorize?client_id=592b7c49df0845263bf62a37723069f2&redirect_uri=https://localhost:5173/auth/kakao-callback&response_type=code';
export const DEV_CALLBACK =
  'https://kauth.kakao.com/oauth/authorize?client_id=592b7c49df0845263bf62a37723069f2&redirect_uri=https://pmodoro-web.vercel.app/auth/kakao-callback&response_type=code';
const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    window.location.href = LOCAL_CALLBACK;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#FEE500] text-black font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#FAD800] transition"
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
