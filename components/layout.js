import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function LayOut({ children }) {
  return (
    <>
      <Head>
        <title>Next Amazona</title>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography>amazona</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {children}
      </Container>

      <footer>
        All rights reserved. Next Amazona.
      </footer>
    </>
  )
}
