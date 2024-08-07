import { userAtom } from "@/atoms/userAtom";
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
import { useRecoilState } from "recoil";

type AuthRegisterFormProps = {
  handleSubmit: () => void;
};

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  handleSubmit,
}: AuthRegisterFormProps) => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedName = e.target.value;
    setUserState((prevState) => {
      if (!prevState.user) return prevState;
      return {
        ...prevState,
        user: {
          ...prevState.user,
          name: changedName,
        },
      };
    });
  };

  return (
    <VStack spacing={4} align="center">
      <Text fontSize="xl" textAlign="center">
        Join the Nested Community
      </Text>
      <Text>
        It looks like you&apos;re new here! Share a few details with us to join
        the Nested community and unlock personalized recommendations tailored
        just for you.
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaUser} />
        </InputLeftElement>
        <Input
          placeholder="Full Name"
          value={userState.user?.name || ""}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaEnvelope} />
        </InputLeftElement>
        <Input
          placeholder="Email Address"
          value={userState.user?.email || ""}
          disabled
        />
      </InputGroup>
      <Button size={"sm"} onClick={handleSubmit} colorScheme="blue">
        Join Now
      </Button>
    </VStack>
  );
};

export default AuthRegisterForm;
