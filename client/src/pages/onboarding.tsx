import React from "react";
import {
  Box,
  Button,
  Step,
  StepIndicator,
  Stepper,
  StepStatus,
  StepTitle,
  StepSeparator,
  Flex,
  Icon,
  useSteps,
  Heading,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { onboardingStepAtom } from "@/atoms/onboardingStepAtom";
import withAuth from "@/components/Modal/Auth/withAuth";

type OnboardingFlowProps = {};

const OnboardingFlow: React.FC<OnboardingFlowProps> = () => {
  const { steps } = useRecoilValue(onboardingStepAtom);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handlePrev = () => setActiveStep((prev) => prev - 1);

  const router = useRouter();

  const handleNextAndSubmit = () => {
    if (activeStep >= steps.length - 1) {
      router.push("/explore");
    } else {
      handleNext();
    }
  };

  return (
    <Flex
      direction="column"
      p={4}
      w={"100%"}
      h={"100%"}
      justifyContent={"space-between"}
    >
      <Stepper index={activeStep} orientation="horizontal" colorScheme="green">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<Icon as={FaCheckCircle} />}
                incomplete={<Icon as={step.stepIcon} color={"gray"} />}
                active={<Icon as={step.stepIcon} color={"green"} />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>{" "}
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Flex flexGrow={1} w={"100%"} h={"100%"}>
        {React.createElement(steps[activeStep].stepContent)}
      </Flex>

      <Flex
        bg={"gray.50"}
        w={"100%"}
        alignContent={"center"}
        gap={4}
        justifyContent={"space-between"}
      >
        <Button
          colorScheme="green.600"
          onClick={handlePrev}
          isDisabled={activeStep <= 0}
          width={"fit-content"}
        >
          Previous
        </Button>
        <Heading as="h6" size="xs" mt={4} textAlign="start" fontWeight="bold">
          {`${steps[activeStep].nextStep}`}
        </Heading>
        <Button
          colorScheme="green.600"
          onClick={handleNextAndSubmit}
          isDisabled={activeStep >= steps.length - 1 && false}
          width={"fit-content"}
        >
          {activeStep >= steps.length - 1 ? "Explore" : "Next"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default withAuth(OnboardingFlow);
