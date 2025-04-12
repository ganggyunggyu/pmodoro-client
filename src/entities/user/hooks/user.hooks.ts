import { useMutation, useQuery } from '@tanstack/react-query';
import { getUser, patchUser } from '../api';

export const useGetUserQuery = (userId: string) => {
  return useQuery({
    queryKey: [userId],
    queryFn: () => getUser(userId),
  });
};

export const usePatchUserMutation = () => {
  return useMutation({
    mutationFn: patchUser,
  });
};
