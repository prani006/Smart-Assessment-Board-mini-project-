const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, registerNumber, password, role } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            registerNumber: registerNumber || null,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            registerNumber: user.registerNumber,
            role: user.role,
            token: jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' })
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                registerNumber: user.registerNumber,
                role: user.role,
                token: jwt.sign({ id: user.id, role: user.role, name: user.name, registerNumber: user.registerNumber, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
