import { atom } from "recoil";

export enum UserStatus {
  admin = "admin",
  whitelist = "whitelist",
  new = "new",
  banned = "banned",
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  status: UserStatus | null;
}

export interface UserAtom {
  user: User | null;
}

const defaultUserState: UserAtom = {
  user: null,
};

export const userAtom = atom<UserAtom>({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: defaultUserState, // default value (aka initial value)
});

export const loadingAtom = atom<boolean>({
  key: "loadingState",
  default: false,
});
