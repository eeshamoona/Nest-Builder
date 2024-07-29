import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, firestore } from "./clientApp";

export const isUserWhitelisted = async (email: string) => {
  const whitelistRef = doc(firestore, "config", "whitelist");
  const docSnap = await getDoc(whitelistRef);

  if (docSnap.exists()) {
    const whitelist = docSnap.data().users || {};
    return whitelist[email] ? true : false;
  } else {
    return false;
  }
};

export const getUserUIDInWhitelist = async (email: string) => {
  const whitelistRef = doc(firestore, "config", "whitelist");
  const docSnap = await getDoc(whitelistRef);

  if (docSnap.exists()) {
    const whitelist = docSnap.data().users || {};
    return whitelist[email] || null;
  } else {
    return null;
  }
};

export const addUserToWhitelist = async (email: string, userId: string) => {
  const whitelistRef = doc(firestore, "config", "whitelist");

  await updateDoc(whitelistRef, {
    [`users.${email}`]: userId,
  });
};
