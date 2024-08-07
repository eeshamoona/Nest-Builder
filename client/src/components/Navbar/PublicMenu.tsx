import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Box,
  Text,
  Link as ChakraLink,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

const PublicMenu = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return isMobile ? (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        variant="unstyled"
        color="primary.600"
        width="fit-content"
      />
      <MenuList>
        <MenuItem
          as={ChakraLink}
          target="_blank"
          href="https://github.com/eeshamoona/Nest-Builder"
          icon={<Icon as={FaGithub} />}
        >
          GitHub Repo
        </MenuItem>
        <MenuItem
          as={ChakraLink}
          target="_blank"
          href="https://devpost.com/software/nested"
          icon={<Icon as={SiDevpost} />}
        >
          Devpost Entry
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <HStack spacing={6}>
      <ChakraLink
        href="https://github.com/eeshamoona/Nest-Builder"
        _hover={{ textDecoration: "none", color: "primary.500" }}
        _active={{ color: "primary.500" }}
        isExternal
      >
        <Box display="flex" alignItems="center">
          <Icon as={FaGithub} mr={2} />
          <Text>GitHub Repo</Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        href="https://devpost.com/software/nested"
        _hover={{ textDecoration: "none", color: "primary.500" }}
        _active={{ color: "primary.500" }}
        isExternal
      >
        <Box display="flex" alignItems="center">
          <Icon as={SiDevpost} mr={2} />
          <Text>Devpost Entry</Text>
        </Box>
      </ChakraLink>
    </HStack>
  );
};

export default PublicMenu;
