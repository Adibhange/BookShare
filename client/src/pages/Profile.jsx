import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../axios.config";
import { signOutUserSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/signout`,
      );

      const data = response.status;

      if (data === 200) {
        dispatch(signOutUserSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container mt-4 flex w-[90%] flex-col items-center gap-3 rounded-3xl bg-foreground p-4 lg:w-1/2">
      <img
        className="h-32 w-32 rounded-full"
        src={currentUser && currentUser.avatar}
        alt=""
      />

      <div className="flex w-3/4 flex-col gap-5 text-text">
        <div>
          <label htmlFor="name" className="mb-2 block">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={currentUser.name}
            readOnly
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={currentUser.email}
            readOnly
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>

        <button
          onClick={handleSignOut}
          className="rounded-lg border-2 border-border p-4 font-semibold text-text transition-colors duration-500 hover:bg-primary"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Profile;
