const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Question = sequelize.define('Question', {
    subject: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    questionText: { type: DataTypes.TEXT, allowNull: false },
    options: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('options'));
        },
        set(val) {
            this.setDataValue('options', JSON.stringify(val));
        }
    },
    correctAnswer: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Question;
