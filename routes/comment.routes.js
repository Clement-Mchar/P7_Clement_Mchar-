const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const commentCtrl = require("../controllers/comment.controller");

router.get('/', commentCtrl.readComment);
router.post('/:id', commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;