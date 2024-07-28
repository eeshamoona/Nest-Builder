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
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaHome, FaInfoCircle, FaCog, FaEnvelope } from "react-icons/fa";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex bg="white" height="3rem" padding="0.375rem 0.75rem">
      <Flex align={"center"} justify={"start"} gap={"0.25rem"} width="100%">
        <Image src="/images/nested-logo.svg" alt="Nested Logo" height="3rem" />
        <Text
          fontSize="xl"
          textAlign="center"
          display={{
            base: "none",
            sm: "unset",
          }}
        >
          Nested
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
