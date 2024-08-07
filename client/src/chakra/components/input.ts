import { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
  baseStyle: (props) => ({
    field: {
      bg: props.colorMode === "dark" ? "background.dark" : "background.light",
      color: props.colorMode === "dark" ? "text.dark" : "text.light",
      borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
      _placeholder: {
        color: props.colorMode === "dark" ? "gray.500" : "gray.700",
      },
    },
  }),
  variants: {
    outline: (props) => ({
      field: {
        borderWidth: "1px",
        borderRadius: "md",
        _hover: {
          borderColor:
            props.colorMode === "dark" ? "primary.600" : "primary.400",
        },
        _focus: {
          borderColor:
            props.colorMode === "dark" ? "primary.500" : "primary.500",
          boxShadow: `0 0 0 1px ${
            props.colorMode === "dark" ? "primary.500" : "primary.500"
          }`,
        },
      },
    }),
  },
  defaultProps: {
    variant: "outline",
  },
};
