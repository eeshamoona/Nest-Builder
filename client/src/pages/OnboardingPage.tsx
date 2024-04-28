import { useState, Suspense, useCallback, useRef } from "react";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import OnboardTransportation from "../components/onboarding/OnboardTransportation";
import OnboardPreferences from "../components/onboarding/OnboardPreferences";
import OnboardCategories from "../components/onboarding/OnboardCategories";
import OnboardReview from "../components/onboarding/OnboardReview";
import OnboardMethod from "../components/onboarding/OnboardMethod";

const steps = [
  "Method",
  "Transportation",
  "Preferences",
  "Review",
  "Categories",
];

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
      return "Unknown step";
  }
};

const OnboardingPage = () => {
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

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
      boxSizing: "border-box",
    },

    button: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
    },
    stepLabel: {
      cursor: "pointer",
    },
  };
  return (
    <div style={styles.container}>
      <Stepper activeStep={activeStep}>
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
            <StepLabel style={styles.stepLabel}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Suspense fallback={<CircularProgress />}>
        {getStepContent(activeStep, registerSave)}
      </Suspense>
      <div>
        <button style={styles.button} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
