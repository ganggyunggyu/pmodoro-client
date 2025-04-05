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
export type UserActivation = {
  setUserInfo: (userInfo: UserInfo) => void;
  setIsAuth: (isAuth: boolean) => void;
};

export const useUserStore = create<UserState & UserActivation>((set) => ({
  userInfo: null,
  isAuth: false,

  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  setIsAuth: (isAuth) => set(() => ({ isAuth })),
}));
