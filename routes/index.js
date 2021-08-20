const express = require('express');
const router = express.Router();
const indexContrller = require('../controllers/index');
const auth = require('../middleware/auth');

router.post('/api/index',auth, indexContrller.index);

module.exports = router;

