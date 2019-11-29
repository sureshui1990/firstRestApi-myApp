const Router = require('express').Router();
const tokenVerify = require('./verifyToken');

// Sample routes to test the token verify functionality
Router.get('/', tokenVerify, (req,res) => {
    res.send({
        post: {
            title: 'this is my first title',
            description:'Helo this is the post in this as welcome to the place to enjoy'
        }
    })
});

module.exports = Router;