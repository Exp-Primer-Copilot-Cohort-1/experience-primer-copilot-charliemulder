// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
const commentFilePath = './comments.json';

// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile(commentFilePath, 'utf8', (err, contents) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(contents);
  });
});

// Add new comment
app.post('/comments', (req, res) => {
  fs.readFile(commentFilePath, 'utf8', (err, contents) => {
    if (err) {
      console.log(err);
      return;
    }
    const comments = JSON.parse(contents);
    comments.push(req.body);
    fs.writeFile(commentFilePath, JSON.stringify(comments), err => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(comments);
    });
  });
});

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
