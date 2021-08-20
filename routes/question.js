const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');
const auth = require('../middleware/auth');

router.post('/api/questions',auth, questionController.createQuestion);
router.get('/api/questions',auth, questionController.getAllQuestion);
router.put('/api/questions/:id',auth, questionController.editQuestion);
router.delete('/api/questions/:id',auth, questionController.deleteQuestion);



module.exports = router;

