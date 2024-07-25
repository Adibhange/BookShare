const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
		},
	},
	{ timestamps: true }
);

module.exports = model("User", userSchema);
