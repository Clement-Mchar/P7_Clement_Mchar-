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

// user display
router.get("/", userCtrl.getAllUsers);
router.get("/", userCtrl.getUser);
router.get("/:id", userCtrl.getUser);
router.put("/:id", multer, ErrorHandler, userCtrl.updateUser);
router.delete("/:uuid", userCtrl.deleteUser);

module.exports = router;
