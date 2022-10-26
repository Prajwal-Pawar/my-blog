const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const db = require('./configs/mongoose');
const passportLocal = require('./configs/passport-local');
const middleware = require('./configs/middleware');

const app = express();
const port = 8000;

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting static files
app.use(express.static('./assets'));

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
    // persisting cookies
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/myblog',
      autoRemove: 'interval',
      autoRemoveInterval: 20, // auto remove cookie after 20 minutes
    }),
  })
);

// using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// for storing flash notification in sessions
app.use(flash());
app.use(middleware.setFlash);

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
