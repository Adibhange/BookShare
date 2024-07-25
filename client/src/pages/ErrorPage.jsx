import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-text">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 text-primary-content transition-transform duration-500 hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
