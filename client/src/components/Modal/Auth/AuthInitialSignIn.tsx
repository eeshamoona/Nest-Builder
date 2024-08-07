import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import GoogleSignInButton from "./GoogleSignInButton";

type AuthInitialSignInProps = {};

const AuthInitialSignIn: React.FC<AuthInitialSignInProps> = ({}) => {
  return (
    <VStack spacing={4} align="center">
      <Text fontSize="xl" textAlign="center">
        Welcome to Nested!
      </Text>
      <Text textAlign="center">
        We use Google data to personalize your journey. Sign in with Google to
        start.
      </Text>
      <GoogleSignInButton />
      <Text fontSize="xs" textAlign="center">
        Your privacy matters. Signing in simply shows if you&apos;re new or
        returning; no accounts are created, no data is stored.
      </Text>
    </VStack>
  );
};

export default AuthInitialSignIn;
