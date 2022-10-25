const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./configs/mongoose');
const passportLocal = require('./configs/passport-local');

const app = express();
const port = 8000;

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// to use encoded data
app.use(express.urlencoded({ extended: true }));

// middleware to encrypt session cookie
app.use(
  session({
    name: 'myblog', // cookie name
    secret: 'AQTyTITuRWyrcRRePkinx7rWbWZNhl7o', // encryption key
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

// using passport
app.use(passport.initialize());
app.use(passport.session());

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
