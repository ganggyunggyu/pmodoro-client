import { useEffect, useRef } from 'react';
import { useUserStore } from '../app/store/useUserStore';
import { useOnboardingStore } from '../app/store/useOnboardingStore';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { PulseLoaderSpinner } from '@/shared/components/PulseLoaderPage';
import { axios } from '../app/config';

export const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const { setOnboardingField } = useOnboardingStore();
  const { setUserInfo, setIsAuth } = useUserStore();

  const getKakaoAccessToken = async () => {
    hasFetched.current = true;
    const result = await axios.get(`/auth/kakao-callback?code=${code}`);

    const { isUser } = result.data;

    if (isUser) {
      const { userInfo } = result.data;

      localStorage.setItem('auth_time', userInfo.kakaoAuthInfo.auth_time);
      localStorage.setItem('userId', userInfo._id);

      setUserInfo(userInfo);
      setIsAuth(true);
      navigate('/');
    }
    if (!isUser) {
      const { kakaoAuthInfo, displayName } = result.data;
      setOnboardingField('displayName', displayName);
      setOnboardingField('kakaoAuthInfo', kakaoAuthInfo);
      navigate('/onboarding/user-info');
    }
  };

  useEffect(() => {
    if (code && !hasFetched.current) getKakaoAccessToken();
  }, []);

  return <PulseLoaderSpinner />;
};
