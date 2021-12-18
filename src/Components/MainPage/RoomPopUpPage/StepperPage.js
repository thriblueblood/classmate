import React from "react";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import NameClassPage from "./NameClassPage";
import AddSubjectMainPage from "./AddSubjectMainPage";

const steps = [
  "Name your class",
  "Fill your class subjects",
  "Select your Bestmate!",
];


function getStepContent(step) {
  switch (step) {
    case 0:
      return (
       <NameClassPage/>
      );
    case 1:
      return <AddSubjectMainPage/>
    case 2:
      return "Finish";
    default:
      return "Default";
  }
}

export default function StepperPage(props) {
  const {setOpenPopUp} = props

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((previousActiveStep) => previousActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((previousActiveStep) => previousActiveStep - 1);
  };

  const isLastStep = () => {
    return activeStep === 2;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <br />
      {isFirstStep() ? (
        <span></span>
      ) : (
        <Button onClick={() => handleBack()}>Back</Button>
      )}
      {isLastStep() ? (
        <Button onClick = {() => 
                setOpenPopUp(false)
                }>Finish</Button>
      ) : (
        <Button onClick={() => handleNext()}>Next</Button>
      )}
    </div>
  );
}
