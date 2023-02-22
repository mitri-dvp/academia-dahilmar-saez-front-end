import { type AppType } from "next/dist/shared/lib/utils";

import NextNProgress from "nextjs-progressbar";

import "@styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        color="#f15a25"
        startPosition={0}
        stopDelayMs={0}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
