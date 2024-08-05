import { Flex } from "@chakra-ui/react";
import React from "react";

type TransportationProps = {};

const Transportation: React.FC<TransportationProps> = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height={"100%"}
      width={"100%"}
      bg={"gray.50"}
    >
      <div>Have a good coding</div>
    </Flex>
  );
};
export default Transportation;
