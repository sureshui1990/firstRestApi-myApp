const mongoose = require('mongoose');

// Create a instance of Schema for post
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Posts',  PostSchema);