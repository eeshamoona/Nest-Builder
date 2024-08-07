import {
  Box,
  Button,
  Text,
  VStack,
  AspectRatio,
  Flex,
  Link as ChakraLink,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FaRocket, FaFlask } from "react-icons/fa";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { userAtom } from "@/atoms/userAtom";
import Link from "next/link";

const LandingPage = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const setUserState = useSetRecoilState(userAtom);
  const { colorMode } = useColorMode();

  //TODO: Determine if these initial states are a good idea
  const handleButtonClick = () => {
    setAuthModalState({ isOpen: true, mode: "login" });
  };

  const color = colorMode === "dark" ? "primary.400" : "primary.500";

  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Text fontSize="5rem" fontWeight={"bold"} textAlign="center">
        Nested
      </Text>
      <Text
        fontSize="md"
        textAlign="center"
        maxWidth={{ base: "100%", lg: "50%" }}
      >
        Moving is stressful. Nested, powered by AI, helps you find the perfect
        places in your new city – from gyms and grocery stores to hidden gems –
        all based on your preferences.
      </Text>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        width="100%"
        mb={8} // Add margin bottom to create space between buttons and video
      >
        <Flex width="100%" maxWidth={{ base: "100%", lg: "50%" }} mx="auto">
          <VStack flex="1" p="0.5rem">
            <Box p="0.1rem" w="100%">
              <Link href="/demo" passHref>
                <Button
                  colorScheme="green"
                  size={{ base: "sm", md: "md" }}
                  leftIcon={<Icon as={FaRocket} />}
                  width="100%"
                >
                  Launch Demo
                </Button>
              </Link>
            </Box>
            <Text fontSize="sm" textAlign="center">
              No sign-up required. Data-safe demo.
            </Text>
          </VStack>

          <VStack flex="1" p="0.5rem">
            <Box p="0.1rem" w="100%">
              <Button
                variant={"outline"}
                colorScheme="blue"
                size={{ base: "sm", md: "md" }}
                leftIcon={<Icon as={FaFlask} />}
                width="100%"
                onClick={handleButtonClick}
              >
                Beta Access
              </Button>
            </Box>
            <Text fontSize="sm" textAlign="center">
              Try Nested with your own data.
            </Text>
          </VStack>
          <AuthModal />
        </Flex>
      </Flex>
      <Flex
        width="100%"
        flexDirection="column"
        maxWidth={{ base: "100%", lg: "50%" }}
        mx="auto"
      >
        <AspectRatio ratio={16 / 9} width="100%">
          <Box
            as="iframe"
            src="https://www.youtube.com/embed/Qyf--S0LUlk"
            allowFullScreen
            width="100%"
            height="100%"
            borderRadius="md"
          />
        </AspectRatio>
        <Text fontSize="sm" textAlign="center" mt={2}>
          Nested in action at the&nbsp;
          <ChakraLink
            href="https://devpost.com/software/nested"
            isExternal
            color={color}
          >
            Google Gen AI Hackathon 2024
          </ChakraLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
