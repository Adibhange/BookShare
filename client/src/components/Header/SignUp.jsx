import React, { useState } from "react";
import OAuth from "./OAuth";
import axios from "./../../../axios.config";

const SignUp = ({ toggleForm }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/signup`,
        userData,
      );

      const newUser = await response.data;

      if (!newUser) {
        console.log("Failed");
      } else {
        toggleForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-text">Register</h1>
      <p className="text-lg text-text">
        Already have an account?
        <button className="text-primary" onClick={toggleForm}>
          Sign In
        </button>
      </p>

      <form
        className="md:[80%] flex w-full flex-col gap-5 lg:w-3/4"
        onSubmit={signUpHandler}
      >
        <div>
          <label htmlFor="username" className="mb-2 block text-text">
            Name:
          </label>
          <input
            type="text"
            placeholder="Aditya Bhange"
            name="name"
            id="name"
            className="text-bold w-full rounded-lg bg-background p-4"
            value={userData.name}
            onChange={changeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-text">
            Email:
          </label>
          <input
            type="email"
            placeholder="YourEmail@gmail.com"
            name="email"
            id="email"
            className="text-bold w-full rounded-lg bg-background p-4"
            value={userData.email}
            onChange={changeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-text">
            Password:
          </label>
          <input
            type="password"
            placeholder="Your Password"
            name="password"
            className="text-bold w-full rounded-lg bg-background p-4"
            value={userData.password}
            onChange={changeInputHandler}
          />
        </div>

        <button className="rounded-lg bg-primary p-4 font-semibold text-text">
          Sign Up
        </button>
      </form>
      <OAuth />
    </div>
  );
};

export default SignUp;
