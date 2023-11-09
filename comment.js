// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Set session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Set path static
app.use('/public', express.static('public'));

// Set port
app.listen(3000);

// Connect database
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'comment'
});

connection.connect();

// Set route
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/comment', function (req, res) {
    var sql = 'SELECT * FROM comment';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render('comment', { comment: result });
    });
});

app.post('/comment', function (req, res) {
    var comment = { name: req.body.name, comment: req.body.comment };
    var sql = 'INSERT INTO comment SET ?';
    connection.query(sql, comment, function (err, result) {
        if (err) throw err;
        res.redirect('/
