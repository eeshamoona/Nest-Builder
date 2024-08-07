import React, { useEffect } from "react";
import {
  VStack,
  Text,
  Image,
  Spinner,
  Box,
  Fade,
  Badge,
  keyframes,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

type AuthAdminWelcomeProps = {};

const AuthAdminWelcome: React.FC<AuthAdminWelcomeProps> = () => {
  const router = useRouter();

  useEffect(() => {
    // Wait for a little bit then navigate to the dashboard
    const timer = setTimeout(() => {
      router.push("/admin-dashboard");
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  // Animation keyframes for a glowing effect
  const glow = keyframes`
    from { box-shadow: 0 0 5px #FFD700; }
    to { box-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700; }
  `;

  return (
    <VStack spacing={6} align="center">
      <Fade in>
        <Box display="flex" justifyContent="center" width="100%">
          <Image
            src="/images/nested-logo.svg"
            alt="Nested Logo"
            boxSize="120px"
            animation={`${glow} 1.5s ease-in-out infinite alternate`}
          />
        </Box>
        <Text fontSize="4xl" textAlign="center">
          Welcome, Admin!
        </Text>
        <Text fontSize="md" textAlign="center">
          We&apos;re honored to have you back. Your administrative dashboard is
          loading.
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Spinner
            size="lg"
            color="secondary.600"
            thickness="4px"
            speed="0.65s"
          />
        </Box>
        <Text fontSize="sm" textAlign="center" mt={2}>
          Loading your special admin content...
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Badge
            colorScheme="yellow"
            fontSize="lg"
            p={2}
            borderRadius="md"
            alignSelf={"center"}
          >
            Admin Access Granted
          </Badge>
        </Box>
      </Fade>
    </VStack>
  );
};

export default AuthAdminWelcome;
