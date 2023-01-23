import { useEffect } from "react";

import "../styles/globals.css";
import { StoreProvider } from "../utils/store";

function MyApp({ Component, pageProps }) {

  // fixing SSR of material ui elements
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
