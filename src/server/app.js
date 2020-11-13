require('dotenv').config();
const express = require('express');
const app = express();

console.log('------------------ process.env.PORT: ', process.env.PORT)

const port = process.env.PORT || 4000;

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });