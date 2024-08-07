import { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  baseStyle: (props) => ({
    dialog: {
      bg: props.colorMode === "dark" ? "background.dark" : "background.light",
      color: props.colorMode === "dark" ? "text.dark" : "text.light",
      borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
      borderRadius: "md",
      boxShadow: props.colorMode === "dark" ? "dark-lg" : "lg",
    },
    header: {
      paddingBottom: 4,
    },
    closeButton: {
      color: props.colorMode === "dark" ? "text.dark" : "text.light",
      _hover: {
        bg: props.colorMode === "dark" ? "primary.700" : "primary.100",
      },
    },
    body: {
      paddingY: 4,
      paddingX: 6,
      color: props.colorMode === "dark" ? "text.dark" : "text.light",
    },
    footer: {
      paddingTop: 4,
    },
  }),
};
