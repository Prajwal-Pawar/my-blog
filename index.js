const express = require('express');
const db = require('./configs/mongoose');

const app = express();
const port = 8000;

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

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
