import Head from "next/head";
import { AppBar, Container, Toolbar, Typography, Link } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import NextLink from "next/link";

const LayOut = ({ title, desc, children }) => {

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {
          desc && <meta name="description" content={desc}/>
        }
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
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
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

export default LayOut;