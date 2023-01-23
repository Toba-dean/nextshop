import { useContext } from "react";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography, Link, ThemeProvider, CssBaseline, Switch } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import NextLink from "next/link";

import { useStyles } from "../utils/styles";
import { Store } from "../utils/store";

const LayOut = ({ title, desc, children }) => {

  const { state: { darkMode }, dispatch } = useContext(Store);
  const classes = useStyles();
  const theme = createTheme({
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
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000"
      },
      secondary: {
        main: "#208080"
      }
    }
  });

  const handleDarkMode = () => {
    dispatch({
      type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON"
    })
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {
          desc && <meta name="description" content={desc} />
        }
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>

            <div className={classes.grow} />
            <div>
              <Switch checked={darkMode} onChange={handleDarkMode} />
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