const express = require('express');
const { getQuestions, createQuestion } = require('../controllers/questionController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getQuestions);
router.post('/', protect, teacherOnly, createQuestion);

module.exports = router;
