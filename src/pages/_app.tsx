import React from "react";
import type { AppProps } from "next/app";
import RootLayout from "../layout/root.layout";
import "../styles/styles.scss";
import { ConfirmProvider } from "material-ui-confirm";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <RootLayout>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </RootLayout>
    </React.Fragment>
  );
}
