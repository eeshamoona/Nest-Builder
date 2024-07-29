import React from "react";
import { VStack, Text, Image, Spinner, Box, Fade } from "@chakra-ui/react";

type AuthWelcomeBackProps = {};

const AuthWelcomeBack: React.FC<AuthWelcomeBackProps> = () => {
  return (
    <VStack spacing={6} align="center">
      <Fade in>
        <Box display="flex" justifyContent="center" width="100%">
          <Image
            src="/images/nested-logo.svg"
            alt="Nested Logo"
            boxSize="120px"
          />
        </Box>
        <Text
          fontSize="3xl"
          fontWeight="extrabold"
          color="gray.700"
          textAlign="center"
        >
          Welcome Back!
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          We’re thrilled to see you again. You’ll be redirected to your
          personalized Nested experience shortly.
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Spinner size="lg" color="blue.500" thickness="4px" speed="0.65s" />
        </Box>
        <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
          Loading your personalized content...
        </Text>
      </Fade>
    </VStack>
  );
};

export default AuthWelcomeBack;
