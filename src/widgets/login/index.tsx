import { Link } from 'react-router';
import { KakaoLoginButton } from '@/shared';

export const Login = () => {
  return (
    <main className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <form className="w-120 h-100 flex flex-col items-center justify-center gap-5 bg-neutral-300">
        <h1>프모도로</h1>
        <p>프모도로에 오신 것을 환영합니다!</p>
        <p>수동적인 팀 빌딩은 그만!</p>
        <p>원하는 팀원을 찾고 효율적으로 푸로젝트를 수행하세요!</p>
        <KakaoLoginButton />
        <Link to={'/pages/onboarding'}>임시</Link>
      </form>
    </main>
  );
};
