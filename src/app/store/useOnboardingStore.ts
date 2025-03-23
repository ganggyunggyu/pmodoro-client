import { create } from 'zustand';

// ✅ Project 타입 정의
export type Project = {
  id: number;
  name: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  description: string;
};

// ✅ 상태 타입
export type OnboardingState = {
  name: string;
  position: string;
  detailPositionList: string[];
  career: number;
  firstArea: string;
  secondArea: string;
  projectList: Project[];
};

// ✅ 액션 타입
export type OnboardingActions = {
  setName: (name: string) => void;
  setPosition: (position: string) => void;
  setDetailPositionList: (position: string) => void;
  setCareer: (career: number) => void;
  setFirstArea: (firstArea: string) => void;
  setSecondArea: (secondArea: string) => void;
  addProject: () => void;
  removeProject: (id: number) => void;
  updateProject: (id: number, field: keyof Project, value: string) => void;
  reset: () => void;

  // ✅ 전체 온보딩 데이터 가져오기
  getOnboardingData: () => OnboardingData;
};

// ✅ getter 함수의 리턴 타입 (state 전체와 동일)
export type OnboardingData = OnboardingState;

// ✅ zustand store 생성
export const useOnboardingStore = create<OnboardingState & OnboardingActions>(
  (set, get) => ({
    // 상태 초기값
    name: '',
    position: '',
    detailPositionList: [],
    career: 0,
    firstArea: '',
    secondArea: '',
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

    // 액션 구현
    setName: (name) => set(() => ({ name })),
    setPosition: (position) => set(() => ({ position })),
    setDetailPositionList: (position) =>
      set((state) => ({
        detailPositionList: state.detailPositionList.includes(position)
          ? state.detailPositionList.filter((p) => p !== position)
          : [...state.detailPositionList, position],
      })),
    setCareer: (career) => set(() => ({ career })),
    setFirstArea: (firstArea) => set(() => ({ firstArea })),
    setSecondArea: (secondArea) => set(() => ({ secondArea })),

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

    reset: () =>
      set({
        name: '',
        position: '',
        detailPositionList: [],
        career: 0,
        firstArea: '',
        secondArea: '',
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
      }),

    // ✅ 온보딩 데이터 getter
    getOnboardingData: () => {
      const {
        name,
        position,
        detailPositionList,
        career,
        firstArea,
        secondArea,
        projectList,
      } = get();

      return {
        name,
        position,
        detailPositionList,
        career,
        firstArea,
        secondArea,
        projectList,
      };
    },
  }),
);
