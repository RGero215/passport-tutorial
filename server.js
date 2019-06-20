require('dotenv').config();
require('./models/User');
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const session = require("express-session");
const mongoose = require('mongoose');
const app = express();

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// We need to use sessions to keep track of our user's login status
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'))

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial', { useNewUrlParser: true });
mongoose.set('debug', true);

require("./controllers/api.js")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`===> 🌎  Listening on port ${PORT}.`, PORT);
});

module.exports = app;
