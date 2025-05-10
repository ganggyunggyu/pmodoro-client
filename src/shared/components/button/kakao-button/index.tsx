import { KakaoIcon } from '@/shared/icons';
import { Button } from '../atom-button';

export const KakaoLoginButton = () => {
  const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = CALLBACK;
  };
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
