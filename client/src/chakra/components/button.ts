import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "md",
    width: "100%",
  },
  sizes: {
    lg: {
      h: "14",
      fontSize: "lg",
    },
    md: {
      h: "12",
      fontSize: "md",
    },
    sm: {
      h: "10",
      fontSize: "sm",
    },
  },
  variants: {
    solid: (props) => ({
      bg: "primary.500", // Normal state for light mode
      color: "text.dark", // Text color responsive to color mode
      _hover: {
        bg: props.colorMode === "dark" ? "primary.400" : "primary.600", // Dark mode primary or light mode primary on hover
      },
      _active: {
        bg: "primary.700", // Using dark mode normal state for active
      },
      _focus: {
        boxShadow: `0 0 0 3px ${
          props.colorMode === "dark"
            ? "rgba(67, 160, 71, 0.5)"
            : "rgba(46, 125, 50, 0.5)"
        }`, // Focus shadow responsive to color mode
      },
    }),
    outline: (props) => ({
      borderColor: "primary.500",
      color: props.colorMode === "dark" ? "text.dark" : "primary.500", // Text color responsive to color mode
      _hover: {
        bg: props.colorMode === "dark" ? "primary.800" : "primary.100", // Dark mode primary or light mode primary on hover
      },
      _active: {
        bg: "secondary.500", // Using secondary color for active state
      },
      _focus: {
        boxShadow: `0 0 0 3px ${
          props.colorMode === "dark"
            ? "rgba(67, 160, 71, 0.5)"
            : "rgba(46, 125, 50, 0.5)"
        }`, // Focus shadow responsive to color mode
      },
    }),
  },
};
