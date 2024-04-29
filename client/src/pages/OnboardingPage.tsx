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
import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  "intro",
  "transportation",
  "preferences",
  "review",
  "categories",
];

const CustomStepIcon = (props: any) => {
  return (
    <StepIcon {...props} style={{ color: "#082100", cursor: "pointer" }} />
  );
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate(`/onboarding/${steps[activeStep + 1].toLowerCase()}`);
  };

  const handleBack = () => {
    if (saveDataRef.current) {
      saveDataRef.current();
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    navigate(`/onboarding/${steps[activeStep - 1].toLowerCase()}`);
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    const index = steps.indexOf(path || "");
    if (index !== -1) {
      setActiveStep(index);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

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
        style={{ margin: "1rem", marginTop: "3rem", width: "100%" }}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => {
              if (index <= activeStep) {
                setActiveStep(index);
                navigate(`/onboarding/${label.toLowerCase()}`);
              }
            }}
          >
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Suspense fallback={<CircularProgress />}>{stepContent}</Suspense>
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
