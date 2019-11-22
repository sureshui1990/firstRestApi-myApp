// Initialize the package
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/post');
const port = process.env.PORT || 4949;
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', postRoutes);

// Default routes
app.get('/', (req,res) => {
    res.send('We are on home page');
});

// Mongoose connectivity
mongoose.connect(process.env.DB_BASE_URL, {useNewUrlParser: true,useUnifiedTopology: true},() => {
    console.log('connected to DB');
})

// Listen the app with port
app.listen(port, () => (console.log(`server running on ${port}`)));