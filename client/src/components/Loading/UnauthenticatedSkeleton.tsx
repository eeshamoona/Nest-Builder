import React from "react";
import { Box, Skeleton, SkeletonText, Flex, VStack } from "@chakra-ui/react";
import AuthModal from "../Modal/Auth/AuthModal";

const UnauthenticatedSkeleton: React.FC = () => {
  return (
    <Flex direction="column" align="center" p={4} w="100%" h="100vh">
      <VStack spacing={8} width="100%" maxWidth="800px">
        <Box width="100%">
          <Skeleton height="50px" mb={4} />
          <Flex justify="space-between" width="100%">
            <Skeleton height="20px" width="40%" />
            <Skeleton height="20px" width="20%" />
          </Flex>
        </Box>

        {/* Main card skeleton */}
        <AuthModal />
        <Box p={6} width="100%" boxShadow="lg" borderRadius="lg" bg="gray">
          <Skeleton height="200px" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton height="40px" mt="4" />
        </Box>

        {/* Smaller content boxes */}
        <Flex direction={{ base: "column", md: "row" }} width="100%" gap={4}>
          <Box flex="1" p={4} boxShadow="lg" borderRadius="lg" bg="gray">
            <Skeleton height="150px" />
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
          <Box flex="1" p={4} boxShadow="lg" borderRadius="lg" bg="gray">
            <Skeleton height="150px" />
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default UnauthenticatedSkeleton;
