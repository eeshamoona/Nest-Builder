import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { FaGoogle, FaUser, FaEnvelope } from "react-icons/fa";
import { authModalState } from "@/atoms/authModalAtom";
import AuthInitialSignIn from "./AuthInitialSignIn";
import AuthWelcomeBack from "./AuthWelcomeBack";
import AuthNextSteps from "./AuthNextSteps";
import AuthRegisterForm from "./AuthRegisterForm";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mockGoogleSignIn = async () => {
    // Simulate the Google sign-in process
    return new Promise<{ isNewUser: boolean }>((resolve) => {
      setTimeout(() => {
        const isNewUser = Math.random() < 0.5; // Randomly decide if the user is new or existing
        resolve({ isNewUser });
      }, 1000); // Simulate network delay
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await mockGoogleSignIn();
      if (result.isNewUser) {
        setIsRegistered(false);
      } else {
        setIsRegistered(true);
        // Redirect after a short delay
        setTimeout(() => {
          onClose();
          // Perform the actual redirect here for when the user is already registered (need to either go to onboarding or dashboard)
        }, 5000);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = () => {
    // Handle form submission for new users here
    setFormSubmitted(true);
  };

  const onClose = () => {
    setModalState({ ...modalState, isOpen: false });
    setIsRegistered(null);
    setFormSubmitted(false);
    setName("");
    setEmail("");
  };

  return (
    <Modal isOpen={modalState.isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} pb={"1rem"}>
            {isRegistered === null ? (
              <AuthInitialSignIn handleGoogleSignIn={handleGoogleSignIn} />
            ) : isRegistered ? (
              <AuthWelcomeBack />
            ) : formSubmitted ? (
              <AuthNextSteps />
            ) : (
              <AuthRegisterForm
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
                handleSubmit={handleSubmit}
              />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
