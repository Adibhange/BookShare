import React from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase.js";
import axios from "./../../../axios.config";
import { signInSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const OAuth = ({ closeModal }) => {
  const dispatch = useDispatch();
  const googleClickHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
      );

      const user = await response.data;

      if (user) {
        dispatch(signInSuccess(user));
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fbClickHandler = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/facebook`,
        {
          name: result.user.displayName,
          email: result._tokenResponse.email,
          photo: result.user.photoURL,
        },
      );
      const user = await response.data;

      if (user) {
        dispatch(signInSuccess(user));
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 border-t-2 border-border">
      <h3 className="pt-2">Or Connect with:</h3>
      <div className="flex w-full gap-2">
        <button
          onClick={googleClickHandler}
          className="w-full rounded-lg border-2 border-border p-4 font-semibold text-text transition-all duration-300 hover:scale-y-105"
        >
          Google
        </button>
        <button
          onClick={fbClickHandler}
          className="w-full rounded-lg border-2 border-border p-4 font-semibold text-text transition-all duration-300 hover:scale-y-105"
        >
          Facebook
        </button>
      </div>
    </div>
  );
};

export default OAuth;
