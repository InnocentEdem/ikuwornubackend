const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');
const auth = require('../middleware/auth');

router.post('/api/sessions',auth, sessionController.createSession);
router.get('/api/sessions',auth, sessionController.getAllSession);
router.put('/api/sessions/:id',auth, sessionController.editSession);
router.delete('/api/sessions/:id',auth, sessionController.deleteSession);


module.exports = router;

