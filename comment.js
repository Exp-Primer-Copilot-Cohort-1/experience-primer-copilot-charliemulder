// Create web server

// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express server
const app = express();

// Set port
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Import routes
const indexRoute = require('./routes/index.route');
const commentRoute = require('./routes/comment.route');

// Use routes
app.use('/', indexRoute);
app.use('/comment', commentRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
