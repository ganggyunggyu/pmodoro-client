import axios from 'axios';

import { useEffect, useRef } from 'react';
import { useUserStore } from '../app/store/useUserStore';
import { useOnboardingStore } from '../app/store/useOnboardingStore';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  console.log(searchParams);
  console.log(useParams());

  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const { setName } = useOnboardingStore();
  const { setUserInfo, setIsAuth } = useUserStore();

  const getKakaoAccessToken = async () => {
    hasFetched.current = true;
    console.log(code);
    const result = await axios.get(
      `http://localhost:3000/auth/kakao-callback?code=${code}`,
    );

    const { userInfo, isUser } = result.data;

    console.log(result.data);

    if (isUser) {
      setUserInfo(userInfo);
      setIsAuth(true);
      navigate('/');
    }
    if (!isUser) {
      setName(userInfo.nickname);

      navigate('/onboarding/user-info');
    }
  };

  useEffect(() => {
    if (code && !hasFetched.current) getKakaoAccessToken();
  }, []);

  return <main>카카오 로그인 진행중</main>;
};
