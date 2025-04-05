import { create } from 'zustand';

type KakaoAuthInfo = {
  kakaoId: string;
  profileImg: string;
  auth_time: number;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  aud: string;
};

export type OnboardingData = {
  email?: string;
  password?: string;

  displayName: string;
  position: string;
  skills: string[];
  isOnline: boolean;
  firstArea?: string;
  secondArea?: string;
  career: number | string;
  description: string;

  kakaoAuthInfo?: KakaoAuthInfo;
};

export type OnboardingState = {
  onboardingData: OnboardingData;
};

export type OnboardingSuccess = {
  isStepOne: boolean;
  isStepTwo: boolean;
  isStepThree: boolean;
};

export type OnboardingActions = {
  setOnboardingField: <T extends keyof OnboardingData>(
    field: T,
    value: OnboardingData[T],
  ) => void;
  setOnboardingSuccess: <T extends keyof OnboardingSuccess>(
    field: T,
    value: boolean,
  ) => void;
  toggleSkill: (skil: string) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>(
  (set, get) => ({
    onboardingData: {
      email: null,
      password: null,
      isOnline: null,
      displayName: null,
      position: null,
      career: null,
      firstArea: null,
      secondArea: null,
      skills: null,
      description: null,

      kakaoAuthInfo: null,
    },

    // 특정 필드 업데이트 액션
    setOnboardingField: (field, value) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          [field]: value,
        },
      })),
    setOnboardingSuccess: (field, value) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          [field]: value,
        },
      })),

    toggleSkill: (skil) =>
      set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          skills: state.onboardingData.skills.includes(skil)
            ? state.onboardingData.skills.filter((p) => p !== skil)
            : [...state.onboardingData.skills, skil],
        },
      })),

    // 상태 초기화 액션
    reset: () =>
      set({
        onboardingData: {
          email: null,
          password: null,
          isOnline: null,
          displayName: null,
          position: null,
          career: null,
          firstArea: null,
          secondArea: null,
          skills: null,
          description: null,
        },
      }),
  }),
);
