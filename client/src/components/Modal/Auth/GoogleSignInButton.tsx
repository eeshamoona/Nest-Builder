import { useAuth } from "@/utils/hooks/useAuth";
import { Button } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

type GoogleSignInButtonProps = {};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = () => {
  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = () => {
    window.open("/sign-in", "_blank");
  };
  return (
    <Button
      leftIcon={<FaGoogle />}
      size="sm"
      onClick={handleGoogleSignIn}
      colorScheme="blue"
    >
      Sign In with Google
    </Button>
  );
};
export default GoogleSignInButton;
