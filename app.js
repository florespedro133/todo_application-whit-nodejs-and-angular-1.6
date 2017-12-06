var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

mongoose.connect("mongodb://127.0.0.1:27017/todo_app");

var index = require('./routes/index');
var authenticate  = require('./routes/authentication/authenticate')(passport);
var accessToData = require('./routes/data/access');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'aiotik',
  clear_interval:900,
  cookie:{maxAge:720*60*60*1000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/auth', authenticate);
app.use('/accessToData', accessToData);
app.use('/data',express.static(path.join(__dirname,'node_modules')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('./models/users.js');
var User = mongoose.model('User');
var initPassport = require('./routes/authentication/passport-init');
initPassport(passport);

module.exports = app;
