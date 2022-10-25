const express = require('express');

const app = express();
const port = 8000;

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// using routes
app.use('/', require('./routes'));

// starting express server
app.listen(port, (error) => {
  if (error) {
    console.log(`error in starting server : ${error}`);
    return;
  }

  console.log(`server is running on port : ${port}`);
});
