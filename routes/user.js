const router = require('express').Router();
const User = require('../models/User');

// Get all user list
router.get('/', async (req, res) => {

    try{
        const userList = await User.find();
        res.json(userList);
    }catch(err){
        res.status(400).json({message: err})
    }

});

//  Submit all user data
router.post('/register', async (req, res) => {
    
    const { name, password, email } = req.body;

    const user = new User({
        name, password, email
    });

    try{
        const savedUser = await user.save();
        res.json(savedUser);
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
//  Delete specific user data
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try{
        const removedUserList = await User.remove({_id:userId});
        res.json(removedUserList);
    }catch(err){
        res.status(400).json({message: err})
    }

});

module.exports = router;