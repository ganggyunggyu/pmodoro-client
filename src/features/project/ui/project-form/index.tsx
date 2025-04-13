import { useUserStore } from '@/app/store/useUserStore';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetProjectByUser, usePostProject } from '@/entities';
import { useWidgetStore } from '@/app/store';

export const ProjectForm = () => {
  const { userInfo } = useUserStore();
  const {
    data: projectList,
    isLoading: isProjectListLoading,
    refetch: projectFetch,
  } = useGetProjectByUser(userInfo?._id);

  const { setIsProjectForm } = useWidgetStore();

  const { mutate: addProject } = usePostProject();

  if (isProjectListLoading) {
    console.log(projectList);
  }
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newProject = {
      name: formData.name,
      position: formData.position,
      duration: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      description: formData.description,
      userId: userInfo?._id,
    };
    addProject(newProject, {
      onSuccess: () => {
        // 프로젝트가 성공적으로 추가된 후, projectFetch()를 호출해 프로젝트 목록을 리패칭
        setIsProjectForm(false); // 폼 닫기
        projectFetch(); // 프로젝트 목록 리패칭
      },
    });
  };

  return (
    <motion.div
      className={`p-4 rounded-md border border-alt mt-7
        
        `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-alt rounded-lg mt-2"
            placeholder="프로젝트 이름을 입력하세요"
          />
        </div>

        <div>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-3 border border-alt rounded-lg mt-2"
            placeholder="직무를 입력하세요"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="startDate" className="block text-gray-700">
              시작일
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-alt rounded-lg mt-2"
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="endDate" className="block text-gray-700">
              종료일
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-alt rounded-lg mt-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-alt rounded-lg mt-2"
            placeholder="프로젝트에 대한 설명을 입력하세요"
            rows={4}
          ></textarea>
        </div>

        <div className="flex w-full items-end justify-center mt-6">
          <div className="flex-1"></div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-primary text-white px-3 py-2 rounded-md"
          >
            저장하기
          </button>
        </div>
      </div>
    </motion.div>
  );
};
