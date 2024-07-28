import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
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
    solid: {
      bg: "green.600",
      color: "gray.50",
      _hover: {
        bg: "green.700",
      },
      _active: {
        bg: "green.800",
      },
      _focus: {
        boxShadow: "0 0 0 3px rgba(46, 125, 50, 0.5)",
      },
    },
    outline: {
      borderColor: "green.600",
      color: "green.600",
      _hover: {
        bg: "green.50",
      },
      _active: {
        bg: "green.100",
      },
      _focus: {
        boxShadow: "0 0 0 3px rgba(46, 125, 50, 0.5)",
      },
    },
  },
};
