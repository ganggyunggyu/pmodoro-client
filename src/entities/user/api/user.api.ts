import { axios } from '@/app/config';
import { UserInfo } from '@/app/store/useUserStore';

export const getUser = async (userId: string): Promise<UserInfo> => {
  const result = await axios.get(`/user/${userId}`);
  return result.data;
};
