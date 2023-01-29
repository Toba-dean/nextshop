import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  Button, FormControl, FormControlLabel, List, ListItem,
  Radio, RadioGroup, Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { Store } from "../utils/store";
import { useStyles } from "../utils/styles";
import { CheckOutWizard, LayOut } from "../components";

export default function Payment() {

  const { dispatch, state: { cart: { shippingAddress } } } = useContext(Store);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping")
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "")
    }
  }, []);

  const submitHandler = e => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method", { variant: "error" })
    } else {
      dispatch({
        type: "SAVE_PAYMENT_METHOD",
        payload: paymentMethod
      });
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  }

  return (
    <LayOut title="Payment">
      <CheckOutWizard activeStep={2} />

      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">Payment Method</Typography>

        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="payment method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={({ target }) => setPaymentMethod(target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                />

                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                />

                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>

          <ListItem>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              continue
            </Button>
          </ListItem>

          <ListItem>
            <Button
              fullWidth
              variant="contained"
              type="button"
              onClick={() => router.push("/shipping")}
            >
              back
            </Button>
          </ListItem>
        </List>
      </form>
    </LayOut>
  )
}
