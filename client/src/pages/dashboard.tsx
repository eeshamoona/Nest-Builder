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
import withAuth from "@/components/Modal/Auth/withAuth";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4}>
        Dashboard
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box p={4} borderRadius="md">
          <Text fontSize="lg"  >
            My Nest Management
          </Text>
          <Text fontSize="sm">
            Add, remove, and manage locations.
          </Text>
        </Box>
        <Divider />
        <Box p={4} borderRadius="md">
          <Text fontSize="lg"  >
            Reports
          </Text>
          <Text fontSize="sm">
            View system reports and logs.
          </Text>
          <HStack mt={2}>
            <Button colorScheme="teal" size="sm">
              View Reports
            </Button>
          </HStack>
        </Box>
        <Divider />
        <Box p={4}  borderRadius="md">
          <Text fontSize="lg"  >
            Settings
          </Text>
          <Text fontSize="sm">
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

export default withAuth(Dashboard);
