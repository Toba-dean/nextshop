import Head from "next/head";
import { AppBar, Container, Toolbar, Typography, Link, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import NextLink from "next/link";

const LayOut = ({ title, desc, children }) => {

  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 900,
        margin: "1rem 0"
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0"
      }
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000"
      },
      secondary: {
        main: "#208080"
      }
    }
  });

  return (
    <>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {
          desc && <meta name="description" content={desc} />
        }
      </Head>

      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  )
}

export default LayOut;