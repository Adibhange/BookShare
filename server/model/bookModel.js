const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			enum: [
				"Novel",
				"Fiction",
				"Mystery",
				"Biography",
				"Thriller",
				"Fantasy",
				"Other",
			],
		},
		review: {
			type: String,
			required: true,
		},
		bookImage: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = model("Book", bookSchema);
