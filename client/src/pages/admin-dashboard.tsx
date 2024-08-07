import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import withAuth from "@/components/Modal/Auth/withAuth";

type AdminDashboardProps = {};

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  return (
    <Flex direction="column" height="100%">
      {/* Header */}
      <Box bg="primary.600" p={4} color="white">
        <Heading as="h1" size="lg">
          Admin Dashboard
        </Heading>
      </Box>

      <Flex flex="1">
        {/* Sidebar */}
        <VStack
          as="nav"
          spacing={4}
          p={4}
          minWidth="200px"
          height="100%"
          alignItems="flex-start"
        >
          <Button variant="ghost" width="100%">
            Home
          </Button>
          <Button variant="ghost" width="100%">
            Manage Users
          </Button>
          <Button variant="ghost" width="100%">
            View Reports
          </Button>
          <Button variant="ghost" width="100%">
            Settings
          </Button>
          <Button variant="ghost" width="100%">
            Logs
          </Button>
          <Button variant="ghost" width="100%">
            Support
          </Button>
        </VStack>

        {/* Main Content */}
        <Box flex="1" p={4}>
          <Heading as="h2" size="md" mb={4}>
            Welcome to your Admin Dashboard
          </Heading>
          <Text mb={4}>
            This is the main content area where you can manage users, view
            reports, configure settings, and access logs.
          </Text>
          <HStack spacing={4}>
            <Box p={4} bg="white" shadow="md" borderRadius="md" flex="1">
              <Heading as="h3" size="sm">
                Manage Users
              </Heading>
              <Text mt={2}>Add, edit, and remove users.</Text>
            </Box>
            <Box p={4} bg="white" shadow="md" borderRadius="md" flex="1">
              <Heading as="h3" size="sm">
                View Reports
              </Heading>
              <Text mt={2}>Access detailed reports and analytics.</Text>
            </Box>
          </HStack>
          <HStack spacing={4} mt={4}>
            <Box p={4} bg="white" shadow="md" borderRadius="md" flex="1">
              <Heading as="h3" size="sm">
                Settings
              </Heading>
              <Text mt={2}>Configure application settings.</Text>
            </Box>
            <Box p={4} bg="white" shadow="md" borderRadius="md" flex="1">
              <Heading as="h3" size="sm">
                Logs
              </Heading>
              <Text mt={2}>Check system logs and activities.</Text>
            </Box>
          </HStack>
        </Box>
      </Flex>

      {/* Footer */}
      <Box bg="primary.600" p={4} color="white" textAlign="center">
        <Text>© 2024 Nested. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default withAuth(AdminDashboard);
