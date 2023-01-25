import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import NextLink from "next/link";
import { useState } from "react";

import { LayOut } from "../components";
import { useStyles } from "../utils/styles";

export default function Login() {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", {
        email, password
      })
      window.alert("Login Successful")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <LayOut title="Login">
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography component="h1" variant="h1">Login</Typography>

        <List>
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
            <NextLink href="/register" passHref>
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
