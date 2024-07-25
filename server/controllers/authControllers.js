const bcrypt = require("bcryptjs");
const User = require("../model/userModel.js");

const HttpError = require("../model/errorModel");
const jwt = require("jsonwebtoken");

// ============================== Normal SignUp ==============================
module.exports.signUp = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const newEmail = email.toLowerCase();
		const emailExists = await User.findOne({ email: newEmail });
		if (emailExists) {
			return next(new HttpError("Email already exist!", 422));
		}

		if (password.trim().length < 6) {
			return next(new HttpError("Password must have atleast 6 characters!"));
		}
		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			name,
			email: newEmail,
			password: hashPass,
		});
		res.status(201).json("Account created successfully");
	} catch (error) {
		return next(new HttpError("Something happend! Account not created", 422));
	}
};

// ============================== Normal SignIn ==============================
module.exports.signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new HttpError("All fields required", 422));
		}

		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(new HttpError("User not found, Please sign up", 422));
		}

		const comparePass = await bcrypt.compare(password, validUser.password);
		if (!comparePass) {
			return next(new HttpError("Password does not match!", 422));
		}

		const { _id: id, name, avatar } = validUser;
		const token = jwt.sign({ id, name }, process.env.JWT__SECRET, {
			expiresIn: "1d",
		});

		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			})
			.json({ id, name, email, avatar });
	} catch (error) {
		return next(new HttpError("Something went wrong!", 422));
	}
};

// ============================== Google SignIn/SignUP ==============================
module.exports.google = async (req, res, next) => {
	try {
		const { name, email, photo } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign({ id: user._id, name }, process.env.JWT__SECRET, {
				expiresIn: "1d",
			});

			const { password: pass, ...rest } = user._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		} else {
			const generatePass = Math.random().toString(36).slice(-8);

			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(generatePass, salt);

			const newUser = await User.create({
				name,
				email,
				password: hashPass,
				avatar: photo,
			});

			const token = jwt.sign({ id: newUser._id }, process.env.JWT__SECRET, {
				expiresIn: "1d",
			});

			const { password: pass, ...rest } = newUser._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		}
	} catch (error) {
		return next(new HttpError("Something went wrong!", 422));
	}
};

// ============================== facebook SignIn/SignUP ==============================
module.exports.facebook = async (req, res, next) => {
	try {
		const { name, email, photo } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign({ id: user._id, name }, process.env.JWT__SECRET, {
				expiresIn: "1d",
			});

			const { password: pass, ...rest } = user._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		} else {
			const generatePass = Math.random().toString(36).slice(-8);
			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(generatePass, salt);

			const newUser = await User.create({
				name,
				email,
				password: hashPass,
				avatar: photo,
			});

			const token = jwt.sign({ id: newUser._id }, process.env.JWT__SECRET, {
				expiresIn: "1d",
			});

			const { password: pass, ...rest } = newUser._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		}
	} catch (error) {
		return next(new HttpError("Something happend! Account not created", 422));
	}
};

// ============================== SignOut ==============================
module.exports.signOut = async (req, res, next) => {
	try {
		res.clearCookie("access_token");
		res.status(200).json("Sign Out");
	} catch (error) {
		return next(new HttpError("Something happend! Account not created", 422));
	}
};
