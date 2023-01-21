import Head from "next/head";
import { AppBar, Container, Toolbar, Typography, Link } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import NextLink from "next/link";

export default function LayOut({ children }) {

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Next Amazona</title>
      </Head>

      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>amazona</Typography>
            </Link>
          </NextLink>

          <div className={classes.grow} />
          <div>
            <NextLink href="/cart">
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login">
              <Link>Login</Link>
            </NextLink>
          </div>
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
