import {
  Avatar,
  Button,
  HStack,
  Text,
  Link as ChakraLink,
  useToast,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import { useRouter } from "next/router";
import { FaEgg } from "react-icons/fa";

const UserMenu = () => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const { logOut } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // const handleLogout = useCallback(async () => {
  //   try {
  //     await logOut();
  //     setUserState((prevState) => {
  //       return {
  //         user: null,
  //       };
  //     });
  //     router.push("/");
  //     toast({
  //       title: "Logged out successfully.",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //     toast({
  //       title: "Failed to log out.",
  //       description: "Please try again.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // }, [logOut, router, setUserState, toast]);

  return (
    <HStack spacing={6} align="center">
      <HStack spacing={1}>
        <Avatar
          name={userState.user?.name}
          src={userState.user?.photoURL}
          size={"xs"}
        />
        <Text whiteSpace="nowrap" fontWeight="bold">
          {userState.user?.name}
        </Text>
      </HStack>
      <ChakraLink
        href="https://github.com/eeshamoona/Nest-Builder"
        _hover={{ textDecoration: "none", textColor: "green" }}
        _active={{ color: "green.500" }}
      >
        <Box display="flex" alignItems="center" color="gray.700" w="100%">
          <Icon as={FaEgg} mr={2} color="green" />
          <Text whiteSpace="nowrap">My Nest</Text>
        </Box>
      </ChakraLink>
      <Button onClick={logOut} size={"md"} variant={"action"}>
        Logout
      </Button>
    </HStack>
  );
};

export default UserMenu;
