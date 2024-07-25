import React from "react";
import { Link } from "react-router-dom";
import AuthModal from "../Farmer/AuthModal";
import { useSelector } from "react-redux";

const NavList = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="">
      <ul className="flex w-full gap-1 px-6 text-base font-bold md:text-lg lg:text-xl">
        <Link
          to={"/"}
          className="rounded-xl px-4 py-2 transition-colors duration-300 hover:bg-primary-light hover:text-primary-content"
        >
          <li>Home</li>
        </Link>
        <Link
          to={"/books"}
          className="rounded-xl px-4 py-2 transition-colors duration-300 hover:bg-primary-light hover:text-primary-content"
        >
          <li>Book</li>
        </Link>

        {currentUser ? (
          <>
            <Link
              to={"/new-book"}
              className="rounded-xl px-4 py-2 transition-colors duration-300 hover:bg-primary-light hover:text-primary-content"
            >
              Add Book
            </Link>
            <Link to={"/profile"} className="h-8 w-12">
              <img className="rounded-full" src={currentUser.avatar} alt="" />
            </Link>
          </>
        ) : (
          <AuthModal />
        )}
      </ul>
    </nav>
  );
};

export default NavList;
