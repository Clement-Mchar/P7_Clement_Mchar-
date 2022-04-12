const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

const userCtrl = require("../controllers/user.controller");

//auth
router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// user display
router.get("/", userCtrl.getAllUsers);
router.get("/:uuid", userCtrl.userInfo);
router.put("/:uuid", userCtrl.updateUser);
router.delete("/:uuid", userCtrl.deleteUser);

module.exports = router;
