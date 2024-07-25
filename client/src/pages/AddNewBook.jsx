import React, { useState } from "react";
import { app } from "./../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "./../../axios.config";
import { useNavigate } from "react-router-dom";

const AddNewBook = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bookGenre = [
    "Novel",
    "Fiction",
    "Mystery",
    "Biography",
    "Thriller",
    "Fantasy",
    "Other",
  ];

  const addBookSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // const bookData = {
    //   title,
    //   author,
    //   genre,
    //   review,
    //   bookImage,
    // };

    // console.log(bookData);

    if (bookImage.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      setLoading(false);
      return;
    }

    const storage = getStorage(app);
    const imgName = `books/${bookImage.name} - ${Date.now()}`;
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, bookImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
      async () => {
        const bookImgURL = await getDownloadURL(uploadTask.snapshot.ref);

        const bookData = {
          title,
          author,
          genre,
          review,
          bookImage: bookImgURL,
        };

        // console.log(bookData);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/book/add`,
            bookData,
            { headers: { "Content-Type": "application/json" } },
          );
          if (response.status === 201) {
            setLoading(false);
            return navigate("/");
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      },
    );
  };

  return (
    <section className="container mt-4 flex w-[90%] flex-col items-center gap-3 rounded-3xl bg-foreground p-4 lg:w-1/2">
      <h2 className="my-2 text-4xl text-text">Add your favoutite Book</h2>
      {error && (
        <p className="text-bold w-3/4 rounded-lg bg-error p-4 text-center text-error-content">
          {error}
        </p>
      )}
      <form
        onSubmit={addBookSubmit}
        className="flex w-3/4 flex-col gap-5 text-text"
      >
        <div>
          <label htmlFor="title" className="mb-2 block">
            Book Title:
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Harry Potter"
            name="title"
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>
        <div>
          <label htmlFor="author" className="mb-2 block">
            Author:
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="J. K. Rowling"
            name="author"
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>

        <div>
          <label htmlFor="genre" className="mb-2 block">
            Genre:
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            name="genre"
            className="text-bold w-full rounded-lg bg-background p-4"
          >
            <option value="" disabled>
              Select a genre
            </option>
            {bookGenre.map((gen) => (
              <option key={gen}>{gen}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="review" className="mb-2 block">
            Review:
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            name="review"
            placeholder="Add your review...."
            rows={5}
            className="text-bold w-full rounded-lg bg-background p-4"
          ></textarea>
        </div>
        <div>
          <label htmlFor="bookImage" className="mb-2 block">
            Add Image:
          </label>
          <input
            onChange={(e) => setBookImage(e.target.files[0])}
            type="file"
            accept="png, jpg, jpeg "
            className="text-bold w-full rounded-lg bg-background p-4"
          />
        </div>

        {loading ? (
          <button
            disabled
            className="cursor-not-allowed rounded-lg border-2 border-border p-4 font-semibold text-text transition-colors duration-500"
          >
            Adding...
          </button>
        ) : (
          <button
            onClick={addBookSubmit} // Assuming addBookSubmit is called on button click
            className="rounded-lg border-2 border-border p-4 font-semibold text-text transition-colors duration-500 hover:bg-primary"
          >
            Add Book
          </button>
        )}
      </form>
    </section>
  );
};

export default AddNewBook;
