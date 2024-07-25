import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
