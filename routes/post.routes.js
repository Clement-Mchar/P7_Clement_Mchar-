const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/auth");

const postCtrl = require("../controllers/post.controller");

router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/:uuid', postCtrl.updatePost);
router.delete('/:uuid', postCtrl.deletePost);
router.patch('/like-post/:uuid', postCtrl.likePost)
router.patch('/unlike-post/:uuid', postCtrl.unlikePost)

module.exports = router;