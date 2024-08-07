import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: { name: string; summary: string[]; color: string };
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, profile }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{profile.name}</DrawerHeader>
          <DrawerBody>
            {profile.summary.map((point, index) => (
              <Text key={index} mb={2}>
                {point}
              </Text>
            ))}
            <Button mt={4} colorScheme={profile.color} onClick={onClose}>
              Start Demo
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SidePanel;
