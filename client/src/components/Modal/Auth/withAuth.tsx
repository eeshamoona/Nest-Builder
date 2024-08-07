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
import { useRouter } from "next/router";

/**
 * Higher-order component (HOC) to restrict access to certain pages based on user authentication
 * and device type. This HOC ensures that only authenticated users (either admin or whitelisted)
 * can access the wrapped component. Additionally, it restricts access for users on mobile devices,
 * prompting them to switch to a desktop for a better experience.
 *
 * @param WrappedComponent - The component to be wrapped and protected by this HOC.
 * @returns A wrapper component that handles authentication and device type checks.
 */
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const { user } = useRecoilValue(userAtom);
    const loading = useRecoilValue(loadingAtom);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [authModal, setAuthModalState] = useRecoilState(authModalState);
    const router = useRouter();

    useEffect(() => {
      if (
        (!loading && !user) ||
        (user?.status !== "whitelist" && user?.status !== "admin")
      ) {
        if (user) {
          router.push("/");
          return;
        }

        setAuthModalState({ isOpen: true, mode: "login" });
        console.log("User is not authenticated, showing login modal...");
      }
    }, [user, loading, setAuthModalState, router]);

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
