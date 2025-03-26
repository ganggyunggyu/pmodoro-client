import { create } from 'zustand';

export type UserInfo = {
  _id: string; //mongoid
  userId: string; //kakaoid
  displayName: string;
  phoneNumber?: string;
  firstArea?: string;
  secondArea?: string;
  position: string;
  detailPositionList: string[];
  career: number;
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
