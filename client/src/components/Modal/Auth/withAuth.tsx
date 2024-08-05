import React, { ComponentType, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, loadingAtom } from "@/atoms/userAtom";
import { authModalState } from "@/atoms/authModalAtom";
import {
  Box,
  Spinner,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import UnauthenticatedSkeleton from "@/components/Loading/UnauthenticatedSkeleton";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const { user } = useRecoilValue(userAtom);
    const loading = useRecoilValue(loadingAtom);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [authModal, setAuthModalState] = useRecoilState(authModalState);

    useEffect(() => {
      if (!loading && !user) {
        setAuthModalState({ isOpen: true, mode: "login" });
        console.log("User is not authenticated, showing login modal...");
      }
    }, [user, loading, setAuthModalState]);

    if (loading) {
      return <Spinner />;
    }

    if (!user) {
      return <UnauthenticatedSkeleton />;
    }

    if (isMobile) {
      return (
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"gray.50"}
          color="#333"
          p={4}
        >
          <Heading as="h1" size="2xl">
            Switch to Desktop
          </Heading>
          <Text fontSize="xl" textAlign="center">
            For a better experience, please switch to a desktop device.
          </Text>
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
