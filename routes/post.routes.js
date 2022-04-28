const express = require("express");
const router = express.Router();

const multer = require('../middlewares/multer.post')

const postCtrl = require("../controllers/post.controller");

router.get('/', postCtrl.readPost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.patch('/like-post/:id', postCtrl.likePost)
router.patch('/unlike-post/:id', postCtrl.unlikePost)

module.exports = router;