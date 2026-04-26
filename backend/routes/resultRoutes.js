const express = require('express');
const { submitResult, getStudentResults, getAllResults } = require('../controllers/resultController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const Result = require('../models/Result');
const User = require('../models/User');
const router = express.Router();

// IMPORTANT: Specific routes must come BEFORE wildcard /:id routes

router.post('/submit', protect, submitResult);

router.get('/all', protect, teacherOnly, getAllResults);

router.get('/student/:id', protect, getStudentResults);

router.get('/:id', protect, async (req, res) => {
    try {
        const result = await Result.findByPk(req.params.id, {
            include: [{ model: User, as: 'student', attributes: ['name', 'registerNumber'] }]
        });
        if (result) {
            res.json({ ...result.get({ plain: true }), _id: result.id });
        } else {
            res.status(404).json({ message: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
