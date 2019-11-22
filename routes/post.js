const routes = require('express').Router();
const Post = require('../models/Post');


// Get back all the post
routes.get('/', async (req, res) => {
    try{
        const AllPost = await Post.find();
        res.json(AllPost);
    }catch(err){
        res.json({message: err})
    }
});

// Submit the post
routes.post('/', async (req, res) => {
 
    const { title, description } = req.body;
    const post = new Post({
        title,description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
    
});

// Get specific all the post
routes.get('/:postId', async (req, res) => {
    
    const { postId} = req.params;
    try{
        const specificPost = await Post.findById(postId);
        res.json(specificPost);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = routes;