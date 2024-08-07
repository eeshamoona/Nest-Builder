import { ComponentStyleConfig } from "@chakra-ui/react";

export const Toast: ComponentStyleConfig = {
  baseStyle: ({ colorMode }) => ({
    container: {
      maxW: "100%",
      bg: colorMode === "dark" ? "gray.700" : "white",
      color: colorMode === "dark" ? "white" : "gray.800",
      boxShadow: "lg",
    },
  }),
  variants: {
    success: {
      container: {
        bg: "success.500",
        color: "white",
      },
    },
    error: {
      container: {
        bg: "error.500",
        color: "white",
      },
    },
    warning: {
      container: {
        bg: "warning.500",
        color: "gray.800",
      },
    },
    info: {
      container: {
        bg: "info.500",
        color: "white",
      },
    },
  },
};
