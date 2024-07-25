import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "./../../axios.config";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/book/${id}`,
        );

        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <section className="container mt-2">
      {book && (
        <div className="mx-auto flex w-11/12 flex-col items-center justify-center gap-4 rounded-3xl bg-foreground p-4 lg:w-3/4">
          <h1 className="text-4xl font-bold text-text">{book.title}</h1>
          <div className="flex w-full justify-between text-xl text-text md:justify-evenly">
            <p>
              <span className="text-primary-light">Author: </span>
              {book.author}
            </p>

            <p className="rounded-lg border-2 border-border px-2 py-1 text-primary-light">
              {book.genre}
            </p>
          </div>
          <div className="h-fit">
            <img
              src={`${book.bookImage}`}
              alt="{book.title}"
              className="rounded-xl"
            />
          </div>

          <p className="px-6 text-lg leading-relaxed text-text">
            {book.review}
          </p>
          <p className="text-lg italic text-text">By: {book.user.name}</p>
        </div>
      )}
    </section>
  );
};

export default BookDetail;
