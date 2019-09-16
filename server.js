// server.js
// where your node app starts

// init project
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');

const app = express();

// Passport Config
// https://www.youtube.com/watch?v=6FOq4cUdH8k used this tutorial for the structure
require('./auth/passport')(passport);

// DB Config
const db = require('./db/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

// Middleware uses
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Express body parser
app.use(express.urlencoded({ extended: true }));
// Flash
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Express routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
