import { create } from 'zustand';

export type Project = {
  id: number;
  name: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  description: string;
};

type ProjectStore = {
  projectList: Project[];
  addProject: () => void;
  removeProject: (id: number) => void;
  updateProject: (id: number, field: keyof Project, value: string) => void;
};

const useProjectStore = create<ProjectStore>((set) => ({
  projectList: [
    {
      id: 1,
      name: '',
      startYear: '',
      startMonth: '',
      endYear: '',
      endMonth: '',
      description: '',
    },
  ],
  addProject: () =>
    set((state) => ({
      projectList: [
        ...state.projectList,
        {
          id: Date.now(),
          name: '',
          startYear: '',
          startMonth: '',
          endYear: '',
          endMonth: '',
          description: '',
        },
      ],
    })),
  removeProject: (id) =>
    set((state) => ({
      projectList: state.projectList.filter((project) => project.id !== id),
    })),
  updateProject: (id, field, value) =>
    set((state) => ({
      projectList: state.projectList.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    })),
}));

export default useProjectStore;
