const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const commentCtrl = require("../controllers/comment.controller");

router.get('/', auth, commentCtrl.readComment);
router.post('/:id', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;