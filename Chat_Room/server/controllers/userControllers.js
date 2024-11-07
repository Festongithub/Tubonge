const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey);

}

// Register user
const registerUser = async(req, res) => {
    try 
    {
	const { name, email, password } = req.body;

	 let user = await userModel.findOne({email});
	if (user) return res.status(400).json("User already exists");

	if(!name || !email || !password)
	    return res.status(400).json("All fields required")

	if(!validator.isEmail(email))
	    return res.status(400).json("Email must be valid")

	if(!validator.isStrongPassword(password))
	    return res.status(400).json("please put a strong password")


	 user = new userModel({name, email, password});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = createToken(user._id);

	res.status(200).json({_id: user._id, name, email, token});
    } catch(error) {
	console.log(error);
	res.status(500).json({error: "Server error"});
    }
};


// login user
const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json("invalid email or password")

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(400).json('Invalid email or password');

        const token = createToken(user._id)

    res.status(200).json({_id: user._id, name: user.name, email, token})
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// findUser
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

// getUser
const getUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// photo and video uploads

const bioUpdate = async(req, res) => {
    const { userBio } = req.body;
    const userId = req.params.userId;

    try{
        const user = userModel.findByIdAndUpdate(userId, {bio}, {new: true})
        res.status(200).json({ message: "Bio updated successfully", user})
    }catch(error){
        res.status(500).json({error: "Failed to upadte bio"});
    }
};

const photoUpload = async(req, res) => {
    const userId = req.params.userId;

    if(!req.files){
        return res.status(400).json({error: "Too big, photo upload failed"});
    }

    try{
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                photo: req.file.path
            },
            {
                new: true
            }
        )
        res.status(200).json({error: "Photo uploaded successfully", user})
    }catch(error){
        res.status(500).json({error: "Failed to upload "})
    }
};

const videoUpload = async(req, res) => {
    const userId = req.params.userId;

    if(!req.files || req.files.length === 0){
        return res.status(400).json({
            error: "video upload failed"
        })
    }

    try{
        const videoPath = req.files.map(file => file.path);
        const user = await userModel.findByIdAndUpdate(
            userId,
            {$push: { videos: {$each: videoPaths}}},
            { new: true }

        );
        res.status(200).json({error: "Video uploaded successfully", user})
    }catch(error){
        res.status(500).json({error: "Failed to upload videos"})
    }
}


module.exports = {registerUser, loginUser, findUser, getUsers, bioUpdate, photoUpload, videoUpload};
