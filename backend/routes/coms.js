const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const comsCtrl = require('../controllers/Coms');

router.post('/', auth, comsCtrl.createCom);

module.exports = router;