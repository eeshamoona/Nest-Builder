import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

type AuthInitialSignInProps = {
  handleGoogleSignIn: () => void;
};

const AuthInitialSignIn: React.FC<AuthInitialSignInProps> = ({
  handleGoogleSignIn,
}) => {
  return (
    <VStack spacing={4} align="center">
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Welcome to Nested!
      </Text>
      <Text textAlign="center">
        We use Google data to personalize your journey. Sign in with Google to
        start.
      </Text>
      <Button
        leftIcon={<FaGoogle />}
        size="sm"
        onClick={handleGoogleSignIn}
        colorScheme="blue"
      >
        Sign In with Google
      </Button>
      <Text fontSize="xs" textAlign="center">
        Your privacy matters. Signing in simply shows if you&apos;re new or
        returning; no accounts are created, no data is stored.
      </Text>
    </VStack>
  );
};

export default AuthInitialSignIn;
