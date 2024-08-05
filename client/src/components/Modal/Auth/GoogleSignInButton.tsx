import { Button } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

type GoogleSignInButtonProps = {};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = () => {
  const handleGoogleSignIn = () => {
    const signInUrl = "/sign-in"; // The URL where your sign-in process is handled
    window.open(signInUrl, "_blank");
  };
  return (
    <Button
      leftIcon={<FaGoogle />}
      size="sm"
      onClick={handleGoogleSignIn}
      colorScheme="blue"
    >
      Sign in with Google
    </Button>
  );
};
export default GoogleSignInButton;
