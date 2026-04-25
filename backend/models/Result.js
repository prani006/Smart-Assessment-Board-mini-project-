const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Result = sequelize.define('Result', {
    subject: { type: DataTypes.STRING, allowNull: false },
    answers: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('answers'));
        },
        set(val) {
            this.setDataValue('answers', JSON.stringify(val));
        }
    },
    marks: { type: DataTypes.INTEGER, allowNull: false },
    totalQuestions: { type: DataTypes.INTEGER, allowNull: false },
    percentage: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Completed' }
});

// Relationships
Result.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
User.hasMany(Result, { foreignKey: 'studentId', as: 'results' });

module.exports = Result;
