require('dotenv').config();
const express = require('express');
const app = express();
const paint = require('./paint');

const port = process.env.PORT || 4000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/paint', paint)
 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });