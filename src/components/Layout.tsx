import Footer from "@components/Footer";
import Header from "@components/Header";
import type { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="relative flex min-h-screen w-full flex-col bg-white">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
