import { axios } from '@/app/config';
import { Project } from '../model';

// 프로젝트 추가
export const postProject = async (projectData: object) => {
  const response = await axios.post('/project', projectData);
  return response.data;
};

// 특정 유저의 프로젝트 목록 조회
export const getProjectByUser = async (userId: string): Promise<Project[]> => {
  const response = await axios.get(`/project/${userId}`);
  return response.data;
};

// 프로젝트 삭제
export const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`/project/${projectId}`);
  return response.data;
};

// 프로젝트 수정 (부분 업데이트)
export const patchProject = async ({ projectId, updatedData }) => {
  const response = await axios.patch(`/project/${projectId}`, updatedData);
  return response.data;
};
