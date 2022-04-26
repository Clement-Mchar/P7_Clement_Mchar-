const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postCtrl = require("../controllers/post.controller");

router.get('/', auth, postCtrl.readPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.patch('/like-post/:id', auth, postCtrl.likePost)
router.patch('/unlike-post/:id', auth, postCtrl.unlikePost)

module.exports = router;