import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";
import spacing from "./spacing";
import layout from "./layout";
import typography from "./typography";
import { Icon } from "./components/icon";
import { Modal } from "./components/modal";
import { Toast } from "./components/toast";
import { Stepper } from "./components/stepper";
import colors from "./brand_colors";
import { Input } from "./components/input";

const styles = {
  global: (props: { colorMode: string }) => ({
    body: {
      bg:
        props.colorMode === "dark"
          ? colors.background.dark
          : colors.background.light,
      color: props.colorMode === "dark" ? colors.text.dark : colors.text.light,
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  typography,
  spacing,
  layout,
  styles,
  components: {
    Button,
    Icon,
    Modal,
    Toast,
    Stepper,
    Input,
  },
});
