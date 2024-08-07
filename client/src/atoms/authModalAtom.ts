import { atom } from "recoil";

export interface AuthModalState {
  isOpen: boolean;
  mode: "login" | "register";
}

const defualtModalState: AuthModalState = {
  isOpen: false,
  mode: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState", // unique ID (with respect to other atoms/selectors)
  default: defualtModalState, // default value (aka initial value)
});
