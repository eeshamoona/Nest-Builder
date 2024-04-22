import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../firebase.config";
import User from "../models/UserModel";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, email, uid, photoURL, metadata } = user;

        setUser({
          id: uid,
          name: displayName || "",
          email: email || "",
          photoURL: photoURL || "",
          createdAt: new Date(metadata.creationTime || ""),
          lastLogin: new Date(metadata.lastSignInTime || ""),
        });
      } else {
        setUser(null);
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
            console.log("Token stored successfully. Token: ", token);
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
    provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    provider.addScope("https://www.googleapis.com/auth/user.gender.read");
    provider.addScope("https://www.googleapis.com/auth/user.organization.read");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.addScope("https://www.googleapis.com/auth/drive");

    setLoading(true);
    try {
      console.log("Signing in with Google");
      await signInWithRedirect(auth, provider);
      await storeGoogleToken();
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
