const { Router } = require("express");
const {
	signUp,
	signIn,
	google,
	facebook,
	signOut,
} = require("../controllers/authControllers");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.post("/facebook", facebook);
router.get("/signout", signOut);

module.exports = router;
