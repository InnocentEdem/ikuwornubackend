const express = require('express');
const router = express.Router();
const contestantContrller = require('../controllers/contestant');
const auth = require('../middleware/auth');

router.post('/api/contestants',auth, contestantContrller.createContestant);
router.get('/api/contestants',auth, contestantContrller.getAllContestant);
router.put('/api/contestants/:id',auth, contestantContrller.editContestant);
router.delete('/api/contestants/:id',auth, contestantContrller.deleteContestant);




module.exports = router;

