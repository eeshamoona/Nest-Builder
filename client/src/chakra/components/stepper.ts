import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers([
    "stepper",
    "step",
    "title",
    "description",
    "indicator",
    "separator",
    "icon",
    "number",
  ]);

const baseStyle = definePartsStyle((props) => ({
  stepper: {
    bg: props.colorMode === "dark" ? "background.dark" : "background.light",
    color: props.colorMode === "dark" ? "text.dark" : "text.light",
  },
  title: {
    color: props.colorMode === "dark" ? "text.dark" : "text.light",
  },
  description: {
    color: props.colorMode === "dark" ? "secondary.500" : "secondary.600",
  },
  indicator: {
    "&[data-status=active]": {
      borderColor: "primary.500",
      color: props.colorMode === "dark" ? "primary.400" : "primary.500",
    },
    "&[data-status=complete]": {
      bg: "primary.500",
    },
    "&[data-status=incomplete]": {
      borderColor: props.colorMode === "dark" ? "gray" : "gray.200",
    },
  },
  separator: {
    "&[data-status=complete]": {
      background: props.colorMode === "dark" ? "primary.400" : "primary.500",
    },
  },
}));

export const Stepper = defineMultiStyleConfig({
  baseStyle,
});
