import {
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
  HStack,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import React, { useMemo } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { userAtom, UserStatus } from "@/atoms/userAtom";
import { useRecoilState } from "recoil";
import Link from "next/link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderMenu = useMemo(() => {
    console.log("User status: ", userState.user);
    if (
      userState.user?.status === UserStatus.whitelist ||
      userState.user?.status === UserStatus.admin
    ) {
      console.log("User is whitelisted or admin");
      return null;
    } else {
      return isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            variant="unstyled"
            color="green.600"
            width="fit-content"
          />
          <MenuList>
            <MenuItem
              as={ChakraLink}
              href="https://github.com/eeshamoona/Nest-Builder"
              icon={<Icon as={FaGithub} />}
              color="gray.700"
            >
              GitHub Repo
            </MenuItem>
            <MenuItem
              as={ChakraLink}
              href="https://devpost.com/software/nested"
              icon={<Icon as={SiDevpost} />}
              color="gray.700"
            >
              Deposit Entry
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={6}>
          <ChakraLink
            href="https://github.com/eeshamoona/Nest-Builder"
            _hover={{ textDecoration: "none", color: "green.500" }}
            _active={{ color: "green.500" }}
            isExternal
          >
            <Box display="flex" alignItems="center" color="gray.700">
              <Icon as={FaGithub} mr={2} />
              <Text>GitHub Repo</Text>
            </Box>
          </ChakraLink>
          <ChakraLink
            href="https://devpost.com/software/nested"
            _hover={{ textDecoration: "none", color: "green.500" }}
            _active={{ color: "green.500" }}
            isExternal
          >
            <Box display="flex" alignItems="center" color="gray.700">
              <Icon as={SiDevpost} mr={2} />
              <Text>Deposit Entry</Text>
            </Box>
          </ChakraLink>
        </HStack>
      );
    }
  }, [isMobile, userState.user]);

  return (
    <Flex
      bg="white"
      height="4rem"
      padding="0.5rem 1rem"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="sm"
    >
      <Flex align={"center"} justify={"start"} gap={"0.5rem"}>
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
          display={{
            base: "none",
            sm: "unset",
          }}
        >
          Nested
        </Text>
      </Flex>
      {renderMenu}
    </Flex>
  );
};

export default Navbar;
