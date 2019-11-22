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
 // Destructuring the data ( unpack the data with const variable )
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

// Get specific a post with uniqueId
routes.get('/:postId', async (req, res) => {

    // Destructuring the data ( unpack the data with const variable )
    const { postId} = req.params;

    try{
        const specificPost = await Post.findById(postId);
        res.json(specificPost);
    }catch(err){
        res.json({message: err})
    }
});

// Update a specific the post with patch routes using uniqueId
routes.patch('/:postId', async (req, res) => {

    const { postId} = req.params;
    const { title } = req.body;

    try{
        const updatedPost = await Post.updateOne(
            {_id: postId},
            { $set: { title }}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message: err})
    }
});

// Remove a specific post with uniqueId
routes.delete('/:postId', async (req, res) => {
    
    const { postId} = req.params;

    try{
        const deletedPost = await Post.deleteOne({_id: postId});
        res.json(deletedPost);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = routes;