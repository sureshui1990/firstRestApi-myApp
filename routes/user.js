const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// Get all user list
router.get('/', async (req, res) => {
    
    try{
        const userList = await User.find({});
        res.json(userList);
    }catch(err){
        res.status(400).json({message: err})
    }

});

// Login
router.get('/login', async (req, res) => {
    const { password, email } = req.body;

    // Validation error
    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).send('Email is not found');
    }

    const validPassword = await bcrypt.compare(password,user.password);

    if(validPassword){
        return res.status(400).send('Invalid password');
    }

    return res.send('Logged in succuessfully')

    // try{
    //     const userList = await User.find({});
    //     res.json(userList);
    // }catch(err){
    //     res.status(400).json({message: err})
    // }

});



//  Submit all user data
router.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    // Validation error
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    // An exist email handle
    const existedUser = await User.findOne({email});
    if(existedUser){
        return res.status(400).send('Email already existed');
    }

    // Hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create a new user
    const user = new User({
        name, password:hashedPassword, email
    });

    try{
        const savedUser = await user.save();
        res.json({user:savedUser._id});
    }catch(err){
        res.status(400).json({message: err})
    }

});

//  Get specific user data
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try{
        const specificUser = await User.findById(userId);
        res.json(specificUser);
    }catch(err){
        res.status(400).json({message: err})
    }

});

//  Update specific user data
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    try{
        const updatedOne = await User.updateOne(
           {_id: userId}, 
           {$set: {name}}
        );
        res.json(updatedOne);
    }catch(err){
        res.status(400).json({message: err})
    }

});
//  Delete specific user data
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try{
        const removedUserList = await User.deleteOne({_id:userId});
        res.json(removedUserList);
    }catch(err){
        res.status(400).json({message: err})
    }

});

module.exports = router;