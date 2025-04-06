import { create } from 'zustand';

type WidgetState = {
  step: number;
  isWidgetOpen: boolean;
  isLoginWidgetOpen: boolean;
  isSearchDropDownOpen: boolean; // 드롭다운 상태 추가
  isProjectForm: boolean; // 프로젝트 폼 상태 추가
};

type WidgetActions = {
  setStep: (step: number) => void;
  setIsWidgetOpen: (isOpen: boolean) => void;
  setIsLoginWidgetOpen: (isOpen: boolean) => void;
  setIsSearchDropDownOpen: (isOpen: boolean) => void; // 드롭다운 상태를 변경하는 액션 추가
  setIsProjectForm: (isOpen: boolean) => void; // 프로젝트 폼 상태 변경하는 액션 추가
  resetWidget: () => void;
};

export const useWidgetStore = create<WidgetState & WidgetActions>((set) => ({
  step: 1,
  isWidgetOpen: false,
  isLoginWidgetOpen: false,
  isSearchDropDownOpen: false, // 드롭다운 상태 초기화
  isProjectForm: false, // 프로젝트 폼 상태 초기화

  setStep: (step) => set(() => ({ step })),
  setIsWidgetOpen: (isOpen) => set(() => ({ isWidgetOpen: isOpen })),
  setIsLoginWidgetOpen: (isOpen) => set(() => ({ isLoginWidgetOpen: isOpen })),
  setIsSearchDropDownOpen: (isOpen) =>
    set(() => ({ isSearchDropDownOpen: isOpen })),
  setIsProjectForm: (isOpen) => set(() => ({ isProjectForm: isOpen })), // 프로젝트 폼 상태를 설정하는 액션
  resetWidget: () =>
    set(() => ({
      step: 1,
      isWidgetOpen: false,
      isLoginWidgetOpen: false,
      isSearchDropDownOpen: false, // 드롭다운 상태 리셋
      isProjectForm: false, // 프로젝트 폼 상태 리셋
    })),
}));
