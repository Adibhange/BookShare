import React, { useState } from "react";
import OAuth from "./OAuth";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../../axios.config";
import { signInSuccess } from "../../redux/userSlice";

const SignIn = ({ toggleForm, closeModal }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  useSelector((state) => state.user);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/signin`,
        userData,
      );
      const user = response.data;
      if (!user) {
        setError(" Signin failed. Please try again!");
      } else {
        dispatch(signInSuccess(user));
        closeModal();
      }
    } catch (err) {
      // setError(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-text">Welcome Back!</h1>
      <p className="text-lg text-text">
        Still don't have an account?
        <button className="text-primary" onClick={toggleForm}>
          Sign up
        </button>
      </p>

      <form
        onSubmit={signInHandler}
        className="md:[80%] flex w-full flex-col gap-5 lg:w-3/4"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-text">
            Email:
          </label>
          <input
            type="email"
            placeholder="YourEmail@gmail.com"
            name="email"
            id="email"
            onChange={changeInputHandler}
            className="text-bold w-full rounded-lg bg-background p-4"
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
            onChange={changeInputHandler}
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>

        <button className="rounded-lg bg-primary p-4 font-semibold text-text">
          Sign In
        </button>
      </form>
      <OAuth closeModal={closeModal} />
    </div>
  );
};

export default SignIn;
