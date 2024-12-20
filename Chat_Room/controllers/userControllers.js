const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expires: "3d"});

}
const registerUser = async(req, res) => {
    try 
    {
        const { name, email, password } = req.body

    let user = await userModel.findOne({email});
    if (user) return res.status(400).json("User already exists...")

    if(!name || !email || !password ) return res.status(400).json("All fields required")

    if(!validator.isEmail(email))
    return res.status(400).json("Email must be valid")


    if(!validator.isStrongPassword(password))
    return res.status(400).json("Please put a strong password")

    user = new userModel({name, email, password})

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = userToken(user._id)

    res.status(200).json({_id: user._id, name, email, token})

} catch(error) {
    console.log(error);
    res.status(500).json(error);
}
};


const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json("invalid email or password")

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(400).json('Invalid email or password');

        const token = userToken(user._id)

    res.status(200).json({_id: user._id, name: user.name, email, token})
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const users = await userModel.findById(userId);
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
}
};

const getUsers = async(req, res) => {
    const userId = req.params.userId;
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
}
};



module.exports = {registerUser, loginUser, findUser, getUsers};