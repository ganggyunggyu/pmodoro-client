import { create } from 'zustand';

type WidgetState = {
  step: number;
  isWidgetOpen: boolean;
  isLoginWidgetOpen: boolean;
  isSearchDropDownOpen: boolean;
  isProjectForm: boolean;
  isProjectFormVisible: boolean;
  isPositionSelector: boolean;
};

type WidgetActions = {
  setStep: (step: number) => void;
  setIsWidgetOpen: (isOpen: boolean) => void;
  setIsLoginWidgetOpen: (isOpen: boolean) => void;
  setIsSearchDropDownOpen: (isOpen: boolean) => void;
  setIsProjectForm: (isOpen: boolean) => void;
  setIsProjectFormVisible: (isVisible: boolean) => void;
  setIsPositionSelector: (isOpen: boolean) => void;
  closeProjectFormWithDelay: () => void;
  resetWidget: () => void;
};

export const useWidgetStore = create<WidgetState & WidgetActions>((set) => ({
  step: 1,
  isWidgetOpen: false,
  isLoginWidgetOpen: false,
  isSearchDropDownOpen: false,
  isProjectForm: false,
  isProjectFormVisible: false,
  isPositionSelector: false,

  setStep: (step) => set(() => ({ step })),
  setIsWidgetOpen: (isOpen) => set(() => ({ isWidgetOpen: isOpen })),
  setIsLoginWidgetOpen: (isOpen) => set(() => ({ isLoginWidgetOpen: isOpen })),
  setIsSearchDropDownOpen: (isOpen) =>
    set(() => ({ isSearchDropDownOpen: isOpen })),
  setIsProjectForm: (isOpen) => set(() => ({ isProjectForm: isOpen })),
  setIsProjectFormVisible: (isVisible) =>
    set(() => ({ isProjectFormVisible: isVisible })),
  setIsPositionSelector: (isOpen) =>
    set(() => ({ isPositionSelector: isOpen })),

  closeProjectFormWithDelay: () => {
    // 애니메이션 exit 시간을 고려한 딜레이 제거
    set(() => ({ isProjectForm: false }));
    setTimeout(() => {
      set(() => ({ isProjectFormVisible: false }));
    }, 500); // framer-motion의 exit duration과 맞추기
  },

  resetWidget: () =>
    set(() => ({
      step: 1,
      isWidgetOpen: false,
      isLoginWidgetOpen: false,
      isSearchDropDownOpen: false,
      isProjectForm: false,
      isProjectFormVisible: false,
      isPositionSelector: false,
    })),
}));
