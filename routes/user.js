const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');

// Get all user list
router.get('/', async (req, res) => {

    try{
        const userList = await User.find();
        res.json(userList);
    }catch(err){
        res.status(400).json({message: err})
    }

});

const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
};

//  Submit all user data
router.post('/register', async (req, res) => {

    const {error} = Joi.validate(req.body,schema);
    res.send(error.details[0].message);
    
    // const { name, password, email } = req.body;

    // const user = new User({
    //     name, password, email
    // });

    // try{
    //     const savedUser = await user.save();
    //     res.json(savedUser);
    // }catch(err){
    //     res.status(400).json({message: err})
    // }

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