import { Flex } from "@chakra-ui/react";
import React from "react";

type ReviewProps = {};

const Review: React.FC<ReviewProps> = () => {
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
export default Review;
