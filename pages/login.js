import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import NextLink from "next/link";

import { LayOut } from "../components";
import { useStyles } from "../utils/styles";

export default function Login() {

  const classes = useStyles();

  return (
    <LayOut title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="h1">Login</Typography>

        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            />
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
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
