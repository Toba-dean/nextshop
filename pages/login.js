import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { LayOut } from "../components";
import { Store } from "../utils/store";
import { useStyles } from "../utils/styles";

export default function Login() {

  const classes = useStyles();
  const { dispatch, state: { currentUser } } = useContext(Store);
  const router = useRouter();
  const { redirect } = router.query;
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser) {
      router.push("/")
    }
  }, []);

  const submitForm = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/user/login", {
        email, password
      });
      dispatch({
        type: "LOGIN_USER",
        payload: data
      });
      Cookies.set("currentUser", JSON.stringify(data));
      router.push(redirect || "/")
    } catch (e) {
      enqueueSnackbar(e.response?.data ? e.response.data.msg : e.message, {
        variant: "error"
      });
    }
  }

  return (
    <LayOut title="Login">
      <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
        <Typography component="h1" variant="h1">Login</Typography>

        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              login
            </Button>
          </ListItem>

          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href={`/signup?redirect=${redirect || "/"}`} passHref>
              <Link>
                Register Now.
              </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </LayOut>
  )
}
