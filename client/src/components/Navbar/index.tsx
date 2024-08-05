import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import PublicMenu from "./PublicMenu";
import { useRecoilValue } from "recoil";
import { userAtom, UserStatus } from "@/atoms/userAtom";

const Navbar = () => {
  const userState = useRecoilValue(userAtom);

  return (
    <Flex
      bg="white"
      height="4rem"
      padding="0.5rem 1rem"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="sm"
    >
      <Flex align="center" justify="start" gap="0.5rem">
        <Link href="/" passHref>
          <Image
            src="/images/nested-logo.svg"
            alt="Nested Logo"
            height="3rem"
          />
        </Link>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="green.600"
          display={{ base: "none", sm: "unset" }}
        >
          Nested
        </Text>
      </Flex>
      {(userState.user && userState.user?.status === UserStatus.whitelist) ||
      userState.user?.status === UserStatus.admin ? (
        <UserMenu />
      ) : (
        <PublicMenu />
      )}
    </Flex>
  );
};

export default Navbar;
