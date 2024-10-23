const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User registration
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create( { username, password: hashedPassword});
        res.json({ message: 'User registered successfully '});
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

// Login user

exports.login = async (req, res ) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }
        const user_token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, 
            { expiresIn: '1h'})
        res.json({ user_token });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}