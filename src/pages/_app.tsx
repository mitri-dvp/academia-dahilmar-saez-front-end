import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";

import NextNProgress from "nextjs-progressbar";

import "@styles/globals.css";
import { SpinnerSVG } from "@components/SVG";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  /*
  This a fix to ensure zustand never hydrates the store before React hydrates the page.
  Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
  an error.
   */
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (isHydrated)
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SpinnerSVG className="mx-auto h-6 w-6 animate-spin text-secondary-500" />
    </div>
  );
};

export default MyApp;
