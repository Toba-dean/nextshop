import { Step, StepLabel, Stepper } from "@material-ui/core";

import { useStyles } from "../utils/styles";

const CheckOutWizard = ({ activeStep = 0 }) => {

  const checkOutData = ["Login", "Shipping Address", "Payment Method", "Place Order"];
  const classes = useStyles();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className={classes.wizard}
    >
      {
        checkOutData.map(step => (
          <Step key={step}>
            <StepLabel>
              {step}
            </StepLabel>
          </Step>
        ))
      }
    </Stepper>
  )
}

export default CheckOutWizard