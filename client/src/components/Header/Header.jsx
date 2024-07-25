import React from "react";
import { Link } from "react-router-dom";
import NavList from "./NavList";

const Header = () => {
  return (
    <header className="container sticky top-0 z-50 px-2 md:px-4 lg:px-8">
      <section className="my-2 flex items-center justify-between rounded-3xl border-border bg-foreground px-2 py-4 text-text md:px-4 lg:px-6">
        <h1 className="text:xl font-extrabold text-primary md:text-2xl lg:text-3xl">
          <Link to={"/"}>BookShare</Link>
        </h1>
        <NavList />
      </section>
    </header>
  );
};

export default Header;
