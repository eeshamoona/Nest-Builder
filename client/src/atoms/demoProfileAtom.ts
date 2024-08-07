import { atom } from "recoil";

export interface Profile {
  name: string;
  gifSrc: string;
  photoSrc: string;
  color: string;
  summary: string[];
}

export interface SelectedProfileAtom {
  profile: Profile | null;
}

const defaultProfileState: SelectedProfileAtom = {
  profile: null,
};

export const demoProfileAtom = atom<SelectedProfileAtom>({
  key: "demoProfileAtom",
  default: defaultProfileState,
});
