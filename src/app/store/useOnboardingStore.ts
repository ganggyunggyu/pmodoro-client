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

export type OnboardingData = {
  email: string;
  password: string;
  name: string;
  position: string;
  detailPositionList: string[];
  career: number | string;
  firstArea: string;
  secondArea: string;
  projectList: Project[];
  job: string;
  skills: string[];
};

export type OnboardingState = {
  onboardingData: OnboardingData;
};

export type OnboardingActions = {
  setOnboardingField: <T extends keyof OnboardingData>(
    field: T,
    value: OnboardingData[T],
  ) => void;
  toggleDetailPosition: (position: string) => void;
  toggleSkill: (skil: string) => void;
  addProject: () => void;
  removeProject: (id: number) => void;
  updateProject: (id: number, field: keyof Project, value: string) => void;
  reset: () => void;
  getOnboardingData: () => OnboardingData;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>(
  (set, get) => ({
    onboardingData: {
      email: '',
      password: '',
      name: '',
      position: '',
      detailPositionList: [],
      career: 0,
      firstArea: '',
      secondArea: '',
      projectList: [],
      job: '',
      techStacks: [],
      skills: [],
    },

    // 특정 필드 업데이트 액션
    setOnboardingField: (field, value) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          [field]: value,
        },
      })),

    // 세부 직무 토글 액션
    toggleDetailPosition: (position) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          detailPositionList: state.onboardingData.detailPositionList.includes(
            position,
          )
            ? state.onboardingData.detailPositionList.filter(
                (p) => p !== position,
              )
            : [...state.onboardingData.detailPositionList, position],
        },
      })),
    toggleSkill: (skil) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          detailPositionList: state.onboardingData.detailPositionList.includes(
            skil,
          )
            ? state.onboardingData.detailPositionList.filter((p) => p !== skil)
            : [...state.onboardingData.detailPositionList, skil],
        },
      })),

    // 프로젝트 추가 액션
    addProject: () =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          projectList: [
            ...state.onboardingData.projectList,
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
        },
      })),

    // 프로젝트 삭제 액션
    removeProject: (id) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          projectList: state.onboardingData.projectList.filter(
            (project) => project.id !== id,
          ),
        },
      })),

    // 프로젝트 업데이트 액션
    updateProject: (id, field, value) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          projectList: state.onboardingData.projectList.map((project) =>
            project.id === id ? { ...project, [field]: value } : project,
          ),
        },
      })),

    // 상태 초기화 액션
    reset: () =>
      set({
        onboardingData: {
          email: '',
          password: '',
          name: '',
          position: '',
          detailPositionList: [],
          career: 0,
          firstArea: '',
          secondArea: '',
          job: '',
          skills: [],
          projectList: [
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
        },
      }),

    // 온보딩 데이터 getter
    getOnboardingData: () => get().onboardingData,
  }),
);
