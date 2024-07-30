// useAuth.ts
import { useRecoilState } from "recoil";
import { userAtom, loadingAtom, UserStatus } from "@/atoms/userAtom";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { checkUserStatus } from "../functions/authFunctions";
import { User } from "@/atoms/userAtom";

export function useAuth() {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        window.close();
        const status = await checkUserStatus(user.email || "");
        setUser({
          user: {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            photoURL: user.photoURL || "",
            status: status || UserStatus.new,
          } as User,
        });
      } else {
        console.error("User not found.");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    // provider.addScope("https://www.googleapis.com/auth/user.gender.read");
    // provider.addScope("https://www.googleapis.com/auth/drive");

    setLoading(true);
    try {
      console.log("Signing in with Google");
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
    setLoading(false);
  };
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("accessToken");
    await signOut(auth);
    setLoading(false);
  };

  return {
    user,
    loading,
    googleSignIn,
    logOut,
  };
}
