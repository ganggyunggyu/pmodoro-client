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

export type UserInfo = {
  _id: string;
  displayName: string;
  position: string;
  skills: string[];
  isOnline: boolean;
  career: number | string;
  description: string;

  email?: string;
  password?: string;
  firstArea?: string;
  secondArea?: string;

  kakaoAuthInfo?: KakaoAuthInfo;
};

export type UserState = {
  userInfo: UserInfo | null;
  isAuth: boolean;
};
export type UserActions = {
  setUserInfo: (userInfo: UserInfo) => void;
  setUserInfoField: <T extends keyof UserInfo>(
    field: T,
    value: UserInfo[T],
  ) => void;
  setIsAuth: (isAuth: boolean) => void;
  toggleSkill: (skill: string) => void;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  userInfo: null,
  isAuth: false,

  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  setIsAuth: (isAuth) => set(() => ({ isAuth })),
  toggleSkill: (skill) =>
    set((state) => {
      const userInfo = state.userInfo;
      if (!userInfo) return {};

      const skills = userInfo.skills || [];
      const updatedSkills = skills.includes(skill)
        ? skills.filter((s) => s !== skill)
        : [...skills, skill];

      return {
        userInfo: {
          ...userInfo,
          skills: updatedSkills,
        },
      };
    }),

  setUserInfoField: (field, value) =>
    set((state) => {
      if (!state.userInfo) return {};
      return {
        userInfo: {
          ...state.userInfo,
          [field]: value,
        },
      };
    }),
}));
