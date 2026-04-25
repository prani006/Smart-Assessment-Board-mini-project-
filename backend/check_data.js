const { sequelize } = require('./config/db');
const Result = require('./models/Result');
const User = require('./models/User');

const check = async () => {
    const results = await Result.findAll({ include: [{ model: User, as: 'student' }] });
    console.log('Results:', JSON.stringify(results, null, 2));
    process.exit();
};

check();
