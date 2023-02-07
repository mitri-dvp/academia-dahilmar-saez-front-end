import Footer from "@components/Footer";
import Header from "@components/Header";
import type { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="relative mx-auto flex min-h-screen w-full max-w-screen-xl flex-col bg-white px-8">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
