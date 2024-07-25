if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

main()
	.then(() => {
		console.log("Connected successfully to DB.");
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect(process.env.MONGO__URL);
}

const corsOrigin =
	process.env.NODE_ENV === "production"
		? process.env.CORS_ORIGIN_DEPLOYMENT
		: process.env.CORS_ORIGIN_LOCAL;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: corsOrigin }));

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on ${process.env.PORT}`);
});
