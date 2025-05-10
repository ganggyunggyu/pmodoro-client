import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteProject,
  getProjectByUser,
  patchProject,
  postProject,
} from '../api';

export const useGetProjectByUser = (userId: string) => {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => getProjectByUser(userId),
  });
};

export const usePostProject = () => {
  return useMutation({
    mutationFn: postProject,
    onError: (error) => {
      console.error('프로젝트 추가 중 오류 발생:', error);
    },
    onSuccess: (data) => {
      console.debug('프로젝트 추가 성공:', data);
    },
  });
};

// 프로젝트 삭제
export const useDeleteProject = () => {
  return useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      console.error('프로젝트 삭제 중 오류 발생:', error);
    },
    onSuccess: (data) => {
      console.debug('프로젝트 삭제 성공:', data);
    },
  });
};
export const usePatchProject = () => {
  return useMutation({
    mutationFn: patchProject,
    onError: (error) => {
      console.error('프로젝트 수정 중 오류 발생:', error);
    },
    onSuccess: (data) => {
      console.debug('프로젝트 수정 성공:', data);
    },
  });
};
