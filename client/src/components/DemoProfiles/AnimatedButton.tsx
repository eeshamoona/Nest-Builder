import { Button, Image } from "@chakra-ui/react";
import { useState } from "react";

interface AnimatedButtonProps {
  gifSrc: string;
  photoSrc: string;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  gifSrc,
  photoSrc,
  onClick = () => {},
}: AnimatedButtonProps) => {
  const [imageSrc, setImageSrc] = useState(photoSrc);

  const handleMouseEnter = () => {
    setImageSrc(gifSrc);
  };

  const handleMouseLeave = () => {
    setImageSrc(photoSrc);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      p={0}
      bg="transparent"
      _hover={{ bg: "transparent" }}
      _focus={{ boxShadow: "none" }}
      w={"100%"}
      h={"100%"}
      maxH={"15rem"}
      maxW={"15rem"}
    >
      <Image src={imageSrc} alt="Animated Button" />
    </Button>
  );
};

export default AnimatedButton;
