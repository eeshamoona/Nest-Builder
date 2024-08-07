import { VStack, Text, Button, HStack } from "@chakra-ui/react";
import React from "react";

type AuthNextStepsProps = {};

const AuthNextSteps: React.FC<AuthNextStepsProps> = () => {
  return (
    <VStack spacing={8} align="center" p={4}>
      <Text fontSize="2xl" textAlign="center">
        Thanks for Registering!
      </Text>

      <VStack align="center" spacing={6}>
        <Text fontSize="lg" textAlign="center">
          You will receive a link in your email shortly to complete your
          registration.
        </Text>
        <Text fontSize="sm" textAlign="start">
          In the meantime, feel free to explore our demo or visit our GitHub
          repository.
        </Text>
        <HStack spacing={4} width={{ base: "100%" }}>
          <Button as="a" href="/demo" target="_blank" variant="solid">
            Explore Demo
          </Button>
          <Button
            as="a"
            href="https://github.com/eeshamoona/Nest-Builder"
            target="_blank"
            variant="outline"
          >
            GitHub Repository
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default AuthNextSteps;
