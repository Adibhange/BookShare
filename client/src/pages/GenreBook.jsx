import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./../../axios.config";
import BookItems from "../components/BookItems";

const GenreBook = () => {
  const [books, setBooks] = useState([]);
  const { genre } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/book/genre/${genre}`,
        );

        setBooks(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <section className="container mt-6 h-full w-full px-2 md:px-4 lg:px-8">
      {books.length > 0 ? (
        <div className="gap:4 grid w-full grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {books.map(
            ({ _id: id, bookImage, title, author, genre, review, user }) => (
              <BookItems
                key={id}
                bookID={id}
                bookImage={bookImage}
                title={title}
                author={author}
                genre={genre}
                review={review}
                user={user}
              />
            ),
          )}
        </div>
      ) : (
        <h2 className="text-center text-4xl text-text">
          Not a single book find in this genre!
        </h2>
      )}
    </section>
  );
};

export default GenreBook;
