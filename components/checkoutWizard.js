import { Step, StepLabel, Stepper } from "@material-ui/core";

const CheckOutWizard = ({ activeStep = 0 }) => {

  const checkOutData = ["Login", "Shipping Address", "Payment Method", "Place Order"];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
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