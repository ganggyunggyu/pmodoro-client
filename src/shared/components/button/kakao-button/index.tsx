import { KakaoIcon } from '@/shared/icons';
import { Button } from '../atom-button';

export const KakaoLoginButton = () => {
  console.log('카카오 클라이언트:', import.meta.env.VITE_KAKAO_CLIENT_ID);
  console.log('리다이렉트 URI:', import.meta.env.VITE_KAKAO_REDIRECT_URI);

  const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = CALLBACK;
    // window.open(CALLBACK, '_self');
  };
  console.log(CALLBACK);
  return (
    <Button
      type="button"
      onClick={handleKakaoLogin}
      className="flex gap-2"
      variant="kakao"
    >
      <KakaoIcon />
      카카오 계정으로 로그인
    </Button>
  );
};
