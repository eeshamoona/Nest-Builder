import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

type DemoPageProps = {};

const DemoPage: React.FC<DemoPageProps> = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#f9faf6"
      color="#333"
      p={4}
    >
      <Heading as="h1" size="2xl">
        Demo Onboarding
      </Heading>
      <Text fontSize="xl" textAlign="center">
        This is where the demo onboarding flow will be implemented.
      </Text>
    </Box>
  );
};
export default DemoPage;
