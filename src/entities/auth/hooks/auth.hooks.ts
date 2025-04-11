import { UserInfo, useUserStore } from '@/app/store/useUserStore';
import { getKakaoLoginCheck } from '../api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// getKakaoLoginCheck의 반환 타입 지정
export const useKakaoLoginCheck = (authTime: string, userId: string) => {
  const { setIsAuth, setUserInfo } = useUserStore();

  return useQuery<UserInfo, Error>(
    {
      queryKey: ['kakao-login-check', authTime, userId],
      queryFn: () => getKakaoLoginCheck(authTime, userId),
      onSuccess: (data) => {
        // 로그인 성공 시 userInfo와 isAuth 상태 업데이트

        console.log(data);
        setUserInfo(data);
        setIsAuth(true);
      },
      onError: (error) => {
        console.error('로그인 체크 중 오류 발생:', error);
        // 로그인 실패 시 추가적인 처리나 메시지 표시 가능
      },
    } as UseQueryOptions<any, Error>, // 타입 캐스팅 추가
  );
};
