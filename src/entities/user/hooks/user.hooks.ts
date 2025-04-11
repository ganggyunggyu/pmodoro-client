import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api';

export const useGetUserQuery = (userId: string) => {
  return useQuery({
    queryKey: [userId],
    queryFn: () => getUser(userId),
  });
};
