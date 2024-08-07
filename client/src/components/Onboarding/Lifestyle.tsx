import { Flex } from "@chakra-ui/react";
import React from "react";

type LifestyleProps = {};

const Lifestyle: React.FC<LifestyleProps> = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height={"100%"}
      width={"100%"}
    >
      <div>Have a good coding</div>
    </Flex>
  );
};
export default Lifestyle;
