import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "../utils/styles";

export default function LayOut({ children }) {

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Next Amazona</title>
      </Head>

      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>amazona</Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.main}>
        {children}
      </Container>

      <footer className={classes.footer}>
        All rights reserved. Next Amazona.
      </footer>
    </>
  )
}
