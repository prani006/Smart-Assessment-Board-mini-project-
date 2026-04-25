const bcrypt = require('bcryptjs');

const test = async () => {
    const pass = 'teacher123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    console.log('Password:', pass);
    console.log('Hash:', hash);
    const match = await bcrypt.compare('teacher123', hash);
    console.log('Match:', match);
};

test();
