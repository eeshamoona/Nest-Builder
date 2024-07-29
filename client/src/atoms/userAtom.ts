import { atom } from "recoil";
import { User } from "firebase/auth";

enum UserStatus {
  admin = "admin",
  whitelist = "whitelist",
  new = "new",
  banned = "banned",
}

export interface UserAtom {
  user: User | null;
  status: UserStatus | null;
}

const defaultUserState: UserAtom = {
  user: null,
  status: null,
};

export const userAtom = atom<UserAtom>({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: defaultUserState, // default value (aka initial value)
});

export const loadingAtom = atom<boolean>({
  key: "loadingState",
  default: false,
});
