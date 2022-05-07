const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const commentCtrl = require("../controllers/comment.controller");

router.get('/', commentCtrl.readComment);
router.patch('/:id', commentCtrl.createComment);
router.patch('/:id', commentCtrl.deleteComment);
router.patch('/:id', commentCtrl.updateComment);

module.exports = router;