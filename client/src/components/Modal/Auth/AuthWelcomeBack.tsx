import React, { useEffect } from "react";
import { VStack, Text, Image, Spinner, Box, Fade } from "@chakra-ui/react";
import { useRouter } from "next/router";

type AuthWelcomeBackProps = {};

const AuthWelcomeBack: React.FC<AuthWelcomeBackProps> = () => {
  const router = useRouter();

  useEffect(() => {
    // Wait for a little bit then navigate to the dashboard
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);
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
        <Text fontSize="3xl" fontWeight="extrabold" textAlign="center">
          Welcome Back!
        </Text>
        <Text fontSize="md" textAlign="center">
          We’re thrilled to see you again. You’ll be redirected to your
          personalized Nested experience shortly.
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Spinner
            size="lg"
            color="primary.500"
            thickness="4px"
            speed="0.65s"
          />
        </Box>
        <Text fontSize="sm" textAlign="center" mt={2}>
          Loading your personalized content...
        </Text>
      </Fade>
    </VStack>
  );
};

export default AuthWelcomeBack;
