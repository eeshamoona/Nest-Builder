import { useEffect } from "react";
import { useAuth } from "@/utils/hooks/useAuth";

export default function GoogleSignIn() {
  const { googleSignIn } = useAuth();

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn().then(() => {
          window.close();
        });
      } catch (error) {
        console.error("Error during Google sign-in: ", error);
      }
    };

    handleGoogleSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Redirecting to Google Sign-In...</div>;
}
