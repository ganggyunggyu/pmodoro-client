import kakaoButtonImage from '@/app/assets/kakao_login_medium_wide.png';
const KakaoLoginButton = () => {
  const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = CALLBACK;
  };

  return (
    <button type="button" onClick={handleKakaoLogin} className="">
      <img src={kakaoButtonImage} alt="" />
    </button>
  );
};

export default KakaoLoginButton;
