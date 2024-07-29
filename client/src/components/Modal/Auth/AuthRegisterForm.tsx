import {
  VStack,
  Text,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

type AuthRegisterFormProps = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
};

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  name,
  email,
  setName,
  setEmail,
  handleSubmit,
}: AuthRegisterFormProps) => {
  return (
    <VStack spacing={4} align="center">
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Join the Nested Community
      </Text>
      <Text>
        It looks like you&apos;re new here! Share a few details with us to join
        the Nested community and unlock personalized recommendations tailored
        just for you.
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaUser} color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaEnvelope} color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <Button size={"sm"} onClick={handleSubmit} colorScheme="blue">
        Join Now
      </Button>
    </VStack>
  );
};
export default AuthRegisterForm;
