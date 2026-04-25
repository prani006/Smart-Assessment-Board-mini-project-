const express = require('express');
const { submitResult, getStudentResults, getAllResults } = require('../controllers/resultController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const Result = require('../models/Result');
const router = express.Router();

router.post('/submit', protect, submitResult);
router.get('/student/:id', protect, getStudentResults);
router.get('/all', protect, teacherOnly, getAllResults);

router.delete('/:id', protect, teacherOnly, async (req, res) => {
    try {
        const deleted = await Result.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ success: true, message: 'Result deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Result not found' });
        }
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
