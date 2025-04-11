import { axios } from '@/app/config';

export const getKakaoLoginCheck = async (authTime, userId) => {
  try {
    const result = await axios.get(
      `/auth/login-check/kakao?auth_time=${authTime}&userId=${userId}`,
    );

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
