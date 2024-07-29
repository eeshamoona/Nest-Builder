import { useEffect } from "react";
import { useAuth } from "@/utils/hooks/useAuth";

export default function GoogleSignIn() {
  const { googleSignIn, logOut } = useAuth();

  useEffect(() => {
    googleSignIn();
  }, []);

  useEffect(() => {
    logOut().then(() => {
      window.close();
    });
  }, [logOut]);

  return <div>Redirecting to Google Sign-In...</div>;
}
