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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      setLoading(false);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
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
