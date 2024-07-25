import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="container my-4 px-2 text-text md:px-4 lg:px-8">
      <div className="flex flex-col rounded-3xl bg-foreground">
        <div className="relative mb-4 text-center md:mb-0">
          <h2 className="my-2 text-lg font-semibold">About Us</h2>
          <p className="text-sm">
            We are dedicated to sharing knowledge and connecting readers with
            their next great read.
          </p>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="absolute bottom-4 right-4 rounded-full bg-primary p-2 text-primary-content transition-transform hover:scale-105"
            >
              <FaChevronUp />
            </button>
          )}
        </div>

        <div className="mt-8 border-t border-border py-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} BookShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
