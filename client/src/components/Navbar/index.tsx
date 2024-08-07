import { Flex, Image, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import UserMenu from "./UserMenu";
import PublicMenu from "./PublicMenu";
import { useRecoilValue } from "recoil";
import { userAtom, UserStatus } from "@/atoms/userAtom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const userState = useRecoilValue(userAtom);
  const color = colorMode === "dark" ? "primary.400" : "primary.500";

  return (
    <Flex
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
          textAlign="center"
          color={color}
          display={{ base: "none", sm: "unset" }}
        >
          Nested
        </Text>
      </Flex>

      <Flex align="center" justify="end">
        {(userState.user && userState.user?.status === UserStatus.whitelist) ||
        userState.user?.status === UserStatus.admin ? (
          <UserMenu />
        ) : (
          <PublicMenu />
        )}

        <IconButton
          aria-label={`Switch to ${
            colorMode === "light" ? "dark" : "light"
          } mode`}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          width={"fit-content"}
          variant={"unstyled"}
          aspectRatio={1}
          lineHeight={0.5}
          _hover={{ color: "secondary.600" }}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
