import { create } from 'zustand';

export type UserInfo = {
  _id: string;
  userId: string;
  displayName: string;
  phoneNumber?: string;
  firstArea?: string;
  secondArea?: string;
  position: string;
  detailPositionList: string[];
  career: number;
  job: string;
  Introduce: string;

  //로컬 로그인 스테이트
  email: string;
  password: string;

  // 카카오 관련 선택 필드
  kakaoId?: number;
  profileImg?: string;
  auth_time?: number;
  exp?: number;
  iat?: number;
  iss?: string;
  sub?: string;
  aud?: string;
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
