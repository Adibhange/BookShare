const { Router } = require("express");
const router = Router();

const { authVerify } = require("../middleware/authMiddleware.js");
const {
	addBook,
	getBooks,
	getBookDetail,
	getGenreBook,
} = require("../controllers/bookControllers.js");

router.post("/add", authVerify, addBook);
router.get("/", getBooks);
router.get("/:id", getBookDetail);
router.get("/genre/:genre", getGenreBook);

module.exports = router;
