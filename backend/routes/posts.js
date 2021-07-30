const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/Posts');

router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;