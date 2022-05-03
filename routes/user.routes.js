const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const multer = require("../middlewares/multer.profil");
const userCtrl = require("../controllers/user.controller");

const ErrorHandler = (err, req, res, next) => {
	if (err) {
        return res.status(500).json({ error: "Something went wrong" });
	} else {
		next();
	}
};


//auth
router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// user displa
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
router.put("/update/picture/:id", multer, ErrorHandler, userCtrl.updatePicture);
router.put("/update/bio/:id", userCtrl.updateBio)
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
