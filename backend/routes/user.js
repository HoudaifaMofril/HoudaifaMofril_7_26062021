const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/users/:id', auth, userCtrl.delUser);
router.get('/users', userCtrl.getUser);

module.exports = router;