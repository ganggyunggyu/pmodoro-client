import { create } from 'zustand';

type WidgetState = {
  step: number;
  isWidgetOpen: boolean;
  isLoginWidgetOpen: boolean;
};

type WidgetActions = {
  setStep: (step: number) => void;
  setIsWidgetOpen: (isOpen: boolean) => void;
  setIsLoginWidgetOpen: (isOpen: boolean) => void;
  resetWidget: () => void;
};

export const useWidgetStore = create<WidgetState & WidgetActions>((set) => ({
  step: 1,
  isWidgetOpen: false,
  isLoginWidgetOpen: false,

  setStep: (step) => set(() => ({ step })),
  setIsWidgetOpen: (isOpen) => set(() => ({ isWidgetOpen: isOpen })),
  setIsLoginWidgetOpen: (isOpen) => set(() => ({ isLoginWidgetOpen: isOpen })),
  resetWidget: () =>
    set(() => ({
      step: 1,
      isWidgetOpen: false,
      isLoginWidgetOpen: false,
    })),
}));
