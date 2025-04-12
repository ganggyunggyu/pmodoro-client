import { useUserStore } from '@/app/store/useUserStore';
import { getKakaoLoginCheck, useKakaoLoginCheck } from '@/entities'; // 수정된 훅 import
import React from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authTime = localStorage.getItem('auth_time');
  const userId = localStorage.getItem('userId');
  const { setIsAuth, setUserInfo } = useUserStore();

  const init = async () => {
    const userInfo = await getKakaoLoginCheck(authTime, userId);
    setUserInfo(userInfo);
    setIsAuth(true);
  };

  React.useEffect(() => {
    if (userId) {
      init();
    } else {
      console.log('기존 로그인 정보 없음');
    }
  }, []);

  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  // if (error) {
  //   return <div>로그인 확인 중 오류가 발생했습니다.</div>;
  // }

  return <React.Fragment>{children}</React.Fragment>;
};
