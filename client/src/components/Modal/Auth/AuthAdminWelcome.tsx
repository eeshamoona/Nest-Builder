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

type AuthAdminWelcomeProps = {};

const AuthAdminWelcome: React.FC<AuthAdminWelcomeProps> = () => {
  useEffect(() => {
    //Wait for a little bit then navigate to the dashboard
    setTimeout(() => {
      window.location.href = "/admin-dashboard";
    }, 3000);
  });

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
        <Text
          fontSize="4xl"
          fontWeight="extrabold"
          color="gray.700"
          textAlign="center"
        >
          Welcome, Admin!
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          We&apos;re honored to have you back. Your administrative dashboard is
          loading.
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <Spinner size="lg" color="gold" thickness="4px" speed="0.65s" />
        </Box>
        <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
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