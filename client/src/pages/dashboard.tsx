import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4}>
        Dashboard
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            My Nest Management
          </Text>
          <Text fontSize="sm" color="gray.600">
            Add, remove, and manage locations.
          </Text>
        </Box>
        <Divider />
        <Box p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Reports
          </Text>
          <Text fontSize="sm" color="gray.600">
            View system reports and logs.
          </Text>
          <HStack mt={2}>
            <Button colorScheme="teal" size="sm">
              View Reports
            </Button>
          </HStack>
        </Box>
        <Divider />
        <Box p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Settings
          </Text>
          <Text fontSize="sm" color="gray.600">
            Configure system settings.
          </Text>
          <HStack mt={2}>
            <Button colorScheme="purple" size="sm">
              Open Settings
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;
