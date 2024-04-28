import { useState, Suspense, useCallback, useRef, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  StepIcon,
  Button,
} from "@mui/material";
import OnboardTransportation from "../components/onboarding/OnboardTransportation";
import OnboardPreferences from "../components/onboarding/OnboardPreferences";
import OnboardCategories from "../components/onboarding/OnboardCategories";
import OnboardReview from "../components/onboarding/OnboardReview";
import OnboardMethod from "../components/onboarding/OnboardMethod";
import { useNavigate } from "react-router-dom";

const steps = [
  "Intro",
  "Transportation",
  "Preferences",
  "Review",
  "Categories",
];

const CustomStepIcon = (props: any) => {
  return (
    <StepIcon {...props} style={{ color: "#082100", cursor: "pointer" }} />
  );
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const saveDataRef = useRef<(() => void) | null>(null);

  const registerSave = useCallback((saveData: () => void) => {
    saveDataRef.current = saveData;
  }, []);

  const handleNext = () => {
    if (saveDataRef.current) {
      saveDataRef.current();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (saveDataRef.current) {
      saveDataRef.current();
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (
    step: number,
    registerSave: (saveData: () => void) => void
  ) => {
    switch (step) {
      case 0:
        return <OnboardMethod registerSave={registerSave} />;
      case 1:
        return <OnboardTransportation registerSave={registerSave} />;
      case 2:
        return <OnboardPreferences registerSave={registerSave} />;
      case 3:
        return <OnboardReview registerSave={registerSave} />;
      case 4:
        return <OnboardCategories registerSave={registerSave} />;
      default:
        return null;
    }
  };

  const stepContent = getStepContent(activeStep, registerSave);

  useEffect(() => {
    if (stepContent === null) {
      navigate("/");
    }
  }, [navigate, stepContent]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100vh",
      padding: "0 5rem",
      boxSizing: "border-box" as "border-box",
      backgroundColor: "#f9faf6",
    },

    button: {
      margin: "1rem",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#082100",
      color: "#C6EEAA",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row" as "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <Stepper
        activeStep={activeStep}
        // alternativeLabel
        style={{ margin: "1rem", marginTop: "3rem", width: "100%" }}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => {
              // Only allow user to navigate to previous steps
              if (index <= activeStep) {
                setActiveStep(index);
              }
            }}
          >
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Suspense fallback={<CircularProgress />}>
          {stepContent || <div>Unknown step</div>}
        </Suspense>
      </div>
      <div style={styles.buttonContainer}>
        <Button style={styles.button} onClick={handleBack}>
          Back
        </Button>
        <Button style={styles.button} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
