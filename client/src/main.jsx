import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AddNewBook from "./pages/AddNewBook.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import GenreBook from "./pages/GenreBook.jsx";
import AllBooks from "./pages/AllBooks";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Profile /> }],
      },
      {
        path: "/new-book",
        element: <PrivateRoute />,
        children: [{ index: true, element: <AddNewBook /> }],
      },
      { path: "/books", element: <AllBooks /> },
      { path: "/book/:id", element: <BookDetail /> },
      { path: "/book/genre/:genre", element: <GenreBook /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);
