import {
  Avatar,
  HStack,
  Text,
  Link as ChakraLink,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtom";
import { FaEgg } from "react-icons/fa";

const UserMenu = () => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const { logOut } = useAuth();

  return (
    <HStack spacing={6} align="center">
      <HStack spacing={1}>
        <Avatar
          name={userState.user?.name}
          src={userState.user?.photoURL}
          size={"xs"}
          bg={"primary.500"}
          color={"text.dark"}
        />
        <Text whiteSpace="nowrap">{userState.user?.name}</Text>
      </HStack>
      <ChakraLink
        href="https://github.com/eeshamoona/Nest-Builder"
        _hover={{ textDecoration: "none", textColor: "green" }}
        _active={{ color: "primary.400" }}
      >
        <Box display="flex" alignItems="center" w="100%">
          <Icon as={FaEgg} mr={2} color="green" />
          <Text whiteSpace="nowrap">My Nest</Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        _hover={{ textDecoration: "none", textColor: "secondary.600" }}
        _active={{ color: "secondary.600" }}
        onClick={logOut}
        size={"md"}
        variant={"action"}
        as="button"
      >
        Logout
      </ChakraLink>
    </HStack>
  );
};

export default UserMenu;
