import React from "react";
import { Link } from "react-router-dom";

const BookItems = ({
  bookID,
  bookImage,
  title,
  author,
  genre,
  review,
  user,
}) => {
  return (
    <article className="rounded-3xl bg-foreground p-1 text-text transition-transform duration-500 hover:scale-95 md:hover:scale-105">
      <Link to={`/book/${bookID}`}>
        {bookImage && (
          <img
            src={`${bookImage}`}
            alt={title}
            className="h-64 w-full rounded-t-3xl object-cover"
          />
        )}
      </Link>
      <div className="p-2">
        <Link to={`/book/${bookID}`}>
          <p className="truncate text-2xl font-bold">{title}</p>
        </Link>
        <p className="mt-2 flex items-center justify-between text-xl">
          <span className="truncate font-semibold">{author}</span>
          <Link
            to={`/book/genre/${genre}`}
            className="rounded-lg border-2 border-border px-2 py-1 text-primary-light transition-colors duration-500 hover:bg-primary-light hover:text-primary-content"
          >
            {genre}
          </Link>
        </p>
        <p className="mt-2 line-clamp-5">{review}</p>
        <p className="pr-4 pt-2 text-right font-bold">By: {user.name}</p>
      </div>
    </article>
  );
};

export default BookItems;
