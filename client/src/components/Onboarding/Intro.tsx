import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

type IntroProps = {};

const Intro: React.FC<IntroProps> = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100%"
      width="100%"
      bg="gray.50"
      p={4}
    >
      <Heading as="h1" mt={4} size="lg" textAlign="center">
        Let&apos;s Make Your New City Feel Like Home
      </Heading>
      <Text fontSize="sm" mt={4} textAlign="center">
        Leverages Gemini 1.5 (Google&apos;s LLM) to help find places in your
        city that can facilitate your lifestyle.
      </Text>
      <Text fontSize="sm" textAlign="center">
        First, please answer some questions so Nested can provide better
        suggestions.
      </Text>
      <Flex
        direction={{ base: "column", lg: "row" }}
        wrap="wrap"
        gap={4}
        mt={8}
        maxWidth="75rem"
        width="100%"
        alignContent={"center"}
        justify="center"
      >
        <Card
          size="sm"
          flex="1"
          minWidth={{ base: "100%", md: "48%" }}
          maxWidth="500px"
          p={6}
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <Heading as="h2" size="md" textAlign="start">
            Basic Info
          </Heading>
          <Text fontSize="sm" textAlign="start">
            We are pulling this information from your Google Account. If it is
            incorrect, please update it here
          </Text>
          <Flex direction="row" align="center" justify="center" mt={4}>
            <Avatar size="md" />
            <Flex direction="column" ml={4} width="100%">
              <Input placeholder="Name" mt={4} />
              <Input placeholder="Email" mt={4} />
              <Input placeholder="Birthday" mt={4} />
              <Input placeholder="Gender" mt={4} />
            </Flex>
          </Flex>
        </Card>

        <Card
          mt={{ base: 4, md: 0 }}
          flex="1"
          minWidth={{ base: "100%", md: "48%" }}
          maxWidth="500px"
          p={6}
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <Heading as="h2" size="md" textAlign="start">
            AI Onboarding [Optional]
          </Heading>
          <Text fontSize="sm" mt={4} textAlign="start">
            Adding your Google Takeout data helps Nested autofill onboarding
            questions to save you time and is not stored. You also have the
            option to answer questions manually, up to you!
          </Text>
          <Button mt={4} width="100%" colorScheme="teal">
            Upload Google Takeout
          </Button>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Intro;
