const Result = require('../models/Result');
const Question = require('../models/Question');
const User = require('../models/User');

const submitResult = async (req, res) => {
    const { studentId, subject, answers } = req.body;
    try {
        let marks = 0;
        const totalQuestions = answers.length;
        
        const evaluatedAnswers = await Promise.all(answers.map(async (ans) => {
            const question = await Question.findByPk(ans.questionId);
            const isCorrect = question.correctAnswer === ans.selectedOption;
            if (isCorrect) marks++;
            return {
                questionId: ans.questionId,
                questionText: question.questionText,
                selectedOption: ans.selectedOption,
                correctAnswer: question.correctAnswer,
                isCorrect
            };
        }));

        const percentage = (marks / totalQuestions) * 100;

        const result = await Result.create({
            studentId,
            subject,
            answers: evaluatedAnswers,
            marks,
            totalQuestions,
            percentage,
            status: 'Completed'
        });

        res.status(201).json({ ...result.toJSON(), _id: result.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentResults = async (req, res) => {
    try {
        const results = await Result.findAll({ 
            where: { studentId: req.params.id },
            include: [{ model: User, as: 'student', attributes: ['name', 'registerNumber'] }]
        });
        const mapped = results.map(r => ({ ...r.get({ plain: true }), _id: r.id }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllResults = async (req, res) => {
    try {
        const results = await Result.findAll({
            include: [{ model: User, as: 'student', attributes: ['name', 'registerNumber'] }]
        });
        const mapped = results.map(r => ({ ...r.get({ plain: true }), _id: r.id }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitResult, getStudentResults, getAllResults };
