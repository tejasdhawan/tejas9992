var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./controllers/index');
var users = require('./controllers/users');

var app = express();
//mongoose connection

mongoose.connect("mongodb://localhost/mydb");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile); 
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/employees',users.index);
app.get('/employees/:id',users.read);
app.post('/employees',users.create);
app.put('/employees/:id',users.update)
app.delete('/employees/:id',users.delete);

app.get('/',routes.show);

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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


//module.exports = app;
http.createServer(app).listen('3000', function(){
  console.log('server started')
})
