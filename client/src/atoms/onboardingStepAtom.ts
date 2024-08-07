import { IconProps, Icon } from "@chakra-ui/react";
import {
  FaInfoCircle,
  FaCar,
  FaListAlt,
  FaAlignJustify,
  FaTags,
  FaInfo,
} from "react-icons/fa";
import { atom } from "recoil";
import Categories from "@/components/Onboarding/Categories";
import Intro from "@/components/Onboarding/Intro";
import Lifestyle from "@/components/Onboarding/Lifestyle";
import Review from "@/components/Onboarding/Review";
import Transportation from "@/components/Onboarding/Transportation";
import { IconType } from "react-icons";

export interface OnboardingStep {
  step: number;
  title: string;
  stepIcon: IconType;
  nextStep: string;
  stepContent: React.FC;
}

export interface OnboardingSteps {
  steps: OnboardingStep[];
}

const defaultOnboardingSteps: OnboardingSteps = {
  steps: [
    {
      step: 1,
      title: "Intro",
      stepIcon: FaInfoCircle,
      nextStep:
        "Excited? Let’s kick things off by exploring how you zip around your new city!",
      stepContent: Intro,
    },
    {
      step: 2,
      title: "Transportation",
      stepIcon: FaCar,
      nextStep:
        "Great! Now let's tailor things to your lifestyle and preferences...",
      stepContent: Transportation,
    },
    {
      step: 3,
      title: "Lifestyle",
      stepIcon: FaListAlt,
      nextStep:
        "Nice picks! Ready to review and tweak your profile to perfection?",
      stepContent: Lifestyle,
    },
    {
      step: 4,
      title: "Review",
      stepIcon: FaAlignJustify,
      nextStep:
        "Looking good! Let's finalize the categories to find the best matches for you...",
      stepContent: Review,
    },
    {
      step: 5,
      title: "Categories",
      stepIcon: FaTags,
      nextStep:
        "You’re all set! Time to get Nesting and find your new favorite spots!",
      stepContent: Categories,
    },
  ],
};

export const onboardingStepAtom = atom<OnboardingSteps>({
  key: "onboardingStepAtom",
  default: defaultOnboardingSteps,
});
