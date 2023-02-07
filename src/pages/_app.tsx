import { useState, useEffect } from "react";

import { type AppType } from "next/dist/shared/lib/utils";

import type { ColorScheme } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import NextNProgress from "nextjs-progressbar";

import "@styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.body.classList.remove(colorScheme === "dark" ? "light" : "dark");
    document.body.classList.add(colorScheme === "dark" ? "dark" : "light");
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider>
        <NotificationsProvider>
          <NextNProgress
            color="#dbe021"
            startPosition={0}
            stopDelayMs={0}
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MyApp;
