const Question = require('../models/Question');

const getQuestions = async (req, res) => {
    const { subject, category } = req.query;
    try {
        let where = { subject };
        if (category && category !== 'Full Aptitude Test') {
            where.category = category;
        }
        const questions = await Question.findAll({ where });
        const mapped = questions.map(q => ({ ...q.toJSON(), _id: q.id }));
        const shuffled = mapped.sort(() => 0.5 - Math.random());
        res.json(shuffled.slice(0, 10));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuestions, createQuestion };
