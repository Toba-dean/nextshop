import { useContext, useState } from "react";
import Head from "next/head";
import {
  AppBar, Container, Toolbar, Typography, Link, MenuItem,
  ThemeProvider, CssBaseline, Switch, Badge, Button, Menu
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import NextLink from "next/link";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useStyles } from "../utils/styles";
import { Store } from "../utils/store";

const LayOut = ({ title, description, children }) => {

  const router = useRouter();
  const { state: { darkMode, cart: { cartItems }, currentUser }, dispatch } = useContext(Store);
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
    const newDarkMode = !darkMode;
    Cookies.set("dark-mode", newDarkMode ? "ON" : "OFF")
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const handleUserMenu = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const LogOutHandler = () => {
    setAnchorEl(null);
    dispatch({
      type: "LOGOUT_USER"
    });
    Cookies.remove("currentUser");
    Cookies.remove("cartItems");
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {
          description && <meta name="description" content={description} />
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
                <Link>
                  {
                    cartItems.length > 0 ? (
                      <Badge
                        badgeContent={cartItems.length}
                        color="secondary"
                        overlap="rectangular"
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )
                  }
                </Link>
              </NextLink>
              {
                currentUser ? (
                  <>
                    <Button
                      className={classes.navbarButton}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleUserMenu}
                    >
                      {currentUser.name}
                    </Button>

                    <Menu
                      id="simple_menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My Account</MenuItem>
                      <MenuItem onClick={LogOutHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                )
              }
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

export default dynamic(() => Promise.resolve(LayOut), { ssr: false });