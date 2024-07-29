// useAuth.ts
import { useRecoilState } from "recoil";
import { userAtom, loadingAtom } from "@/atoms/userAtom";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";

export function useAuth() {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User signed in: ", user);
      } else {
        console.log("No user signed in");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const storeGoogleToken = async () => {
    console.log("Storing Google token");
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          if (!token) {
            console.log("No token from credential. Credential: ", credential);
          } else {
            localStorage.setItem("accessToken", token);
            console.log("Token stored successfully!");
          }
        } else {
          console.log("No credential from result. Result: ", result);
        }
      } else {
        console.log("No result from redirect. Auth: ", auth);
      }
    } catch (error) {
      console.error("Error getting redirect result: ", error);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    // provider.addScope("https://www.googleapis.com/auth/user.gender.read");
    // provider.addScope("https://www.googleapis.com/auth/drive");

    setLoading(true);
    try {
      console.log("Signing in with Google");
      await signInWithRedirect(auth, provider).then(async () => {
        console.log("Signed in with Google");
        await storeGoogleToken();
      });
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
