import React, { useState } from "react";
import {
  Box,
  Highlight,
  SimpleGrid,
  Heading,
  Text,
  useBreakpointValue,
  Link,
  VStack,
} from "@chakra-ui/react";
import SidePanel from "@/components/DemoProfiles/SidePanel";
import AnimatedButton from "@/components/DemoProfiles/AnimatedButton";
import { Profile } from "@/atoms/demoProfileAtom";
import profilesData from "@/data/profilesData";

const DemoPage: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleButtonClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  if (isMobile) {
    return (
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
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

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={2}>
        Welcome to the Demo
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
        Click on a profile to read about them and start the demo.
      </Text>
      <Box display="flex" mt={4} width="80%">
        <Box p={4} flex="1">
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {profilesData.map((profile, index) => (
              <VStack key={index} spacing={4}>
                <AnimatedButton
                  gifSrc={profile.gifSrc}
                  photoSrc={profile.photoSrc}
                  onClick={() => handleButtonClick(profile)}
                />
                <Text fontSize="xl" textAlign="center">
                  {selectedProfile?.name === profile.name ? (
                    <Highlight
                      query={profile.name}
                      styles={{
                        px: "2",
                        py: "1",
                        rounded: "md",
                        bg: `${profile.color}40`,
                      }}
                    >
                      {profile.name}
                    </Highlight>
                  ) : (
                    profile.name
                  )}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
        {selectedProfile && (
          <SidePanel
            isOpen={isPanelOpen}
            onClose={handlePanelClose}
            profile={selectedProfile}
          />
        )}
      </Box>
      <Link href="https://storyset.com/people" isExternal>
        <Text fontSize="sm" textAlign="center" mt={4} color="green.500">
          People illustrations by Storyset
        </Text>
      </Link>
    </Box>
  );
};

export default DemoPage;
