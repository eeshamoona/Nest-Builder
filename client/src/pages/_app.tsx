import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra/theme";

// Represents the root component of the application, every page will be rendered inside this component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}

export default MyApp;
