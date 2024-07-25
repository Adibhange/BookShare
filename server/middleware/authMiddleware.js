const jwt = require("jsonwebtoken");
const HttpError = require("../model/errorModel");

module.exports.authVerify = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(new HttpError("Unauthorized. No token", 402));
	}

	jwt.verify(token, process.env.JWT__SECRET, (err, info) => {
		if (err) {
			return next(new HttpError("Unauthorized. Invalid token", 403));
		}

		req.user = info;
		next();
	});
};
