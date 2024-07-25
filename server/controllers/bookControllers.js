const Book = require("../model/bookModel.js");
const HttpError = require("../model/errorModel.js");
// ============================== Create Book Listing ==============================
module.exports.addBook = async (req, res, next) => {
	try {
		const { title, author, genre, bookImage, review } = req.body;

		if (!title || !author || !genre || !bookImage || !review) {
			return next(new HttpError("All fileds required", 422));
		}

		const book = await Book.create({
			title,
			author,
			genre,
			bookImage,
			review,
			user: req.user.id,
		});
		return res.status(201).json(book);
	} catch (error) {
		return next(new HttpError(error));
	}
};

// ============================== Get All Book ==============================
module.exports.getBooks = async (req, res, next) => {
	try {
		let books = await Book.find()
			.populate("user", "name")
			.sort({ createdAt: -1 });

		res.status(200).json(books);
	} catch (error) {
		return next(new HttpError(error));
	}
};

// ============================== Get Book Detail ==============================
module.exports.getBookDetail = async (req, res, next) => {
	try {
		let book = await Book.findById(req.params.id).populate("user", "name");
		if (!book) {
			return next(new HttpError("Book not found!", 404));
		}

		res.status(200).json(book);
	} catch (error) {
		return next(new HttpError(error));
	}
};

// ============================== Get Book By Genre ==============================
module.exports.getGenreBook = async (req, res, next) => {
	try {
		let { genre } = req.params;
		const genreBooks = await Book.find({ genre })
			.populate("user", "name")
			.sort({ createdAt: -1 });

		res.status(200).json(genreBooks);
	} catch (error) {
		return next(new HttpError(error));
	}
};
