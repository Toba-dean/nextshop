import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { LayOut } from "../components";
import { Store } from "../utils/store";
import { useStyles } from "../utils/styles";

export default function Login() {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { dispatch, state: { currentUser } } = useContext(Store);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (currentUser) {
      router.push("/")
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert("Password Don't Match!!")
      return;
    }
    try {
      const { data } = await axios.post("/api/user/signup", {
        name, email, password
      });
      dispatch({
        type: "LOGIN_USER",
        payload: data
      });
      Cookies.set("currentUser", JSON.stringify(data));
      router.push(redirect || "/")
    } catch (e) {
      alert(e.response?.data ? e.response.data.msg : e.message)
    }
  }

  return (
    <LayOut title="Sign Up">
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography component="h1" variant="h1">Sign Up</Typography>

        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Username"
              inputProps={{ type: "text" }}
              onChange={({ target }) => setName(target.value)}
            />
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={({ target }) => setEmail(target.value)}
            />
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={({ target }) => setPassword(target.value)}
            />
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="cf_password"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </ListItem>

          <ListItem>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              register
            </Button>
          </ListItem>

          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
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
