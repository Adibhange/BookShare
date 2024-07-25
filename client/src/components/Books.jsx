import React, { useEffect, useState } from "react";
import axios from "./../../axios.config";
import BookItems from "./BookItems";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/book`,
        );
        setBooks(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="mt-6">
      {books.length > 0 ? (
        <div className="grid w-full grid-rows-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
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
          Not a single book find!
        </h2>
      )}
    </div>
  );
};

export default Books;
