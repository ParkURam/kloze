var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var reg = require('./routes/reg');
var users = require('./routes/users');
var main = require('./routes/main');
var privateUser = require('./routes/private');
var post = require('./routes/post');
var imageController = require('./routes/imageController');
var multer = require('multer');
var passport = require('passport');
var fs = require('fs');

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser({keepExtensions: true, uploadDir:'./uploads'}));
app.use(expressSession({secret:'mySecreKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
    dest: './images/',
    changeDest: function(dest, req, res) {
      req.session.user_id = 'b43a6ae0-bcb4-11e4-945a-cb211b311fe2';
      dest += '/'+ req.session.user_id;
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      return dest;
}}));

app.use('/', routes);
app.use('/post', post);
app.use('/regist', reg);
app.use('/@*', privateUser);
app.use('/user', users);
app.use('/main', main);
app.use('/images', imageController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});