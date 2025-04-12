import { axios } from '@/app/config';
import { UserInfo } from '@/app/store/useUserStore';
import { useMutation } from '@tanstack/react-query';

export const getUser = async (userId: string): Promise<UserInfo> => {
  const result = await axios.get(`/user/${userId}`);
  return result.data;
};

export const patchUser = async ({ userId, updatedData }) => {
  try {
    const response = await axios.patch(`/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('유저 정보 수정 실패', error);
    throw error;
  }
};
