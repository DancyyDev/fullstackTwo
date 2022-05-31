const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const mongoDb = require('./config/database.js')
const port = process.env.PORT || 1111
const passport = require('passport')
const mongoose = require('mongoose');
const flash    = require('connect-flash');

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

let db

mongoose.connect(mongoDb.url, (err, database) => {
    if (err) return console.log(err)
    db = database
    require('./app/routes.js')(app, passport, db);
  });

require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

app.listen(port);
console.log('Your ideas are in ' + port);