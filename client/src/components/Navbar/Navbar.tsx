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
  Link,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaHome, FaInfoCircle, FaCog, FaEnvelope } from "react-icons/fa";
import React, { useMemo } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { userAtom, UserStatus } from "@/atoms/userAtom";
import { useRecoilState } from "recoil";

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
    }

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
          <MenuItem icon={<Icon as={FaHome} />} color="gray.700">
            Home
          </MenuItem>
          <MenuItem icon={<Icon as={FaInfoCircle} />} color="gray.700">
            About Us
          </MenuItem>
          <MenuItem icon={<Icon as={FaCog} />} color="gray.700">
            Our Success
          </MenuItem>
          <MenuItem icon={<Icon as={FaEnvelope} />} color="gray.700">
            Contact
          </MenuItem>
        </MenuList>
      </Menu>
    ) : (
      <HStack spacing={6}>
        <Link
          href="#"
          _hover={{ textDecoration: "none", color: "green.500" }}
          _active={{ color: "green.500" }}
        >
          <Box display="flex" alignItems="center" color="gray.700">
            <Icon as={FaHome} mr={2} />
            <Text>Home</Text>
          </Box>
        </Link>
        <Link
          href="#"
          _hover={{ textDecoration: "none", color: "green.500" }}
          _active={{ color: "green.500" }}
        >
          <Box display="flex" alignItems="center" color="gray.700">
            <Icon as={FaInfoCircle} mr={2} />
            <Text>About Us</Text>
          </Box>
        </Link>
        <Link
          href="#"
          _hover={{ textDecoration: "none", color: "green.500" }}
          _active={{ color: "green.500" }}
        >
          <Box display="flex" alignItems="center" color="gray.700">
            <Icon as={FaCog} mr={2} />
            <Text>Our Success</Text>
          </Box>
        </Link>
        <Link
          href="#"
          _hover={{ textDecoration: "none", color: "green.500" }}
          _active={{ color: "green.500" }}
        >
          <Box display="flex" alignItems="center" color="gray.700">
            <Icon as={FaEnvelope} mr={2} />
            <Text>Contact</Text>
          </Box>
        </Link>
      </HStack>
    );
  }, [isMobile, userState.user?.status]);

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
        <Image src="/images/nested-logo.svg" alt="Nested Logo" height="3rem" />
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
